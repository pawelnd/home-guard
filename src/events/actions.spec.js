import {fakeSchedulers, marbles} from "rxjs-marbles/mocha";
import { map } from "rxjs/operators";
import {timer} from "rxjs";
import * as sinon from "sinon";

describe("basic", () => {
    it('should multiply by "2" each value emitted', marbles((m) => {
        const values = { a: 1, b: 2, c: 3, x: 2, y: 4, z: 6};
        const source = m.cold('-a-b-c-|', values);
        const expected = m.cold('-x-y-z-|', values);
        const result = source.pipe(map(x => x*2));
        m.expect(result).toBeObservable(expected);
    }));


    let clock;

    beforeEach(() => {
        clock = sinon.useFakeTimers();
    });

    it("should be testable with fake time", fakeSchedulers(() => {
        let received;
        timer(100).subscribe(value => received = value);
        clock.tick(50);

        clock.tick(50);
        expect(received).to.equal(0);
    }));

    afterEach(() => {
        clock.restore();
    });

    it("should support marble tests without values", marbles(m => {

        const source =  m.hot("--^-a-b-c-|");
        const subs =            "^-------!";
        const expected = m.cold("--b-c-d-|");

        const destination = source.pipe(
            map(value => String.fromCharCode(value.charCodeAt(0) + 1))
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with values", marbles(m => {

        const inputs = {
            a: 1,
            b: 2,
            c: 3
        };
        const outputs = {
            x: 2,
            y: 3,
            z: 4
        };

        const source =  m.hot("--^-a-b-c-|", inputs);
        const subs =            "^-------!";
        const expected = m.cold("--x-y-z-|", outputs);

        const destination = source.pipe(
            map((value) => value + 1)
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with errors", marbles(m => {

        const source =  m.hot("--^-a-b-c-#");
        const subs =            "^-------!";
        const expected = m.cold("--a-b-c-#");

        const destination = source;
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));

    it("should support marble tests with explicit errors", marbles(m => {

        const inputs = {
            a: 1,
            b: 2,
            c: 3
        };
        const outputs = {
            x: 2,
            y: 3,
            z: 4
        };

        const source =  m.hot("--^-a-b-c-#", inputs, new Error("Boom!"));
        const subs =            "^-------!";
        const expected = m.cold("--x-y-z-#", outputs, new Error("Boom!"));

        const destination = source.pipe(
            map((value) => value + 1)
        );
        m.expect(destination).toBeObservable(expected);
        m.expect(source).toHaveSubscriptions(subs);
    }));
});