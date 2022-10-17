import { createSubscribable } from "../pubsub";

describe("pubsub", () => {

    let sub = createSubscribable();

    beforeEach(() => {
        sub = createSubscribable();
    })

    it("should work with multiple subscribers", () => {

        const message = [1, 'a']

        sub.on("topic", (m) => {
            expect(m).toStrictEqual(message);
        });

        sub.on("topic", (m) => {
            expect(m).toStrictEqual(message);
        });

        sub.emitt("topic", message)
    })

    it("unsubscribing should stop callbakcs", () => {
        const fn = jest.fn()

        const unsub = sub.on("topic", fn);

        sub.emitt("topic")

        unsub();

        sub.emitt("topic")

        expect(fn).toBeCalledTimes(1)
    })


})