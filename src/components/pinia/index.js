import { defineStore } from "pinia";

// 指定id为 main，可以define多个，这里只默认导出一个。
export default defineStore('main', {
    state: () => {
        return {
            hello: 'hello!world!'
        };
    },
    getters: {

    },
    actions: {

    }
});