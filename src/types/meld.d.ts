// meld.d.ts

/**
 * The main meld function for applying aspects to a target object or function.
 * @param target The object or function to advise.
 * @param pointcut A selector for methods to advise on the target object.
 * @param aspect An object containing advice functions.
 * @returns A remover object to undo the advising, or the newly advised function.
 */
declare function meld<T extends object>(target: T, pointcut: meld.Pointcut, aspect: meld.Aspect): meld.Remover;
declare function meld<F extends (...args: any[]) => any>(target: F, aspect: meld.Aspect): F;

declare namespace meld {
    /** A selector for methods to advise on a target object. */
    type Pointcut = string | string[] | RegExp | ((target: object) => string[]);

    /** A function that can be advised. */
    type AdvisedFunction = (...args: any[]) => any;

    /** An object that provides information about the method being advised. */
    interface Joinpoint<T = any, A extends any[] = any[], R = any> {
        /** The `this` context for the advised method. */
        readonly target: T;
        /** The name of the advised method. */
        readonly method: string;
        /** The arguments passed to the advised method. */
        readonly args: A;
        /** The result of the original method call. Available in `afterReturning` and `after` advice. */
        result?: R;
        /** The exception thrown by the original method. Available in `afterThrowing` and `after` advice. */
        exception?: any;

        /**
         * Proceeds to the next advice or the original method.
         * @param newArgs Optional new arguments to pass to the method.
         * @returns The result of the method call.
         */
        proceed(...newArgs: any[]): R;

        /**
         * Proceeds to the next advice or the original method with an array of arguments.
         * @param newArgs Optional array of new arguments.
         * @returns The result of the method call.
         */
        proceedApply(newArgs?: any[]): R;

        /** Returns the number of times `proceed` has been called. */
        readonly proceedCount: () => number;
    }

    // Advice function types
    type BeforeAdvice = (...args: any[]) => void;
    type OnAdvice = (...args: any[]) => void;
    type AroundAdvice<T = any, A extends any[] = any[], R = any> = (joinpoint: Joinpoint<T, A, R>) => R;
    type AfterReturningAdvice<R = any> = (result: R) => void;
    type AfterThrowingAdvice = (error: any) => void;
    type AfterAdvice<R = any> = (resultOrError: R | any) => void;

    /** An object containing one or more advice functions. */
    interface Aspect {
        /** Executes before the advised method. */
        before?: BeforeAdvice;
        /** Executes after the original method args have been applied, but before the original method returns. */
        on?: OnAdvice;
        /** Executes "around" the advised method, with control over whether the original method is called. */
        around?: AroundAdvice;
        /** Executes after the advised method returns successfully. */
        afterReturning?: AfterReturningAdvice;
        /** Executes after the advised method throws an exception. */
        afterThrowing?: AfterThrowingAdvice;
        /** Executes after the advised method returns or throws, similar to a `finally` block. */
        after?: AfterAdvice;
    }

    /** An object with a `remove` method to undo advising. */
    interface Remover {
        /** Removes the associated advice or aspect. */
        remove(): void;
    }

    /**
     * Adds `before` advice to a method or function.
     * @returns A remover object or the newly advised function.
     */
    function before<F extends AdvisedFunction>(func: F, advice: BeforeAdvice): F;
    function before(target: object, method: string, advice: BeforeAdvice): Remover;

    /**
     * Adds `around` advice to a method or function.
     * @returns A remover object or the newly advised function.
     */
    function around<F extends AdvisedFunction>(func: F, advice: AroundAdvice): F;
    function around(target: object, method: string, advice: AroundAdvice): Remover;

    /**
     * Adds `on` advice to a method or function.
     * @returns A remover object or the newly advised function.
     */
    function on<F extends AdvisedFunction>(func: F, advice: OnAdvice): F;
    function on(target: object, method: string, advice: OnAdvice): Remover;

    /**
     * Adds `afterReturning` advice to a method or function.
     * @returns A remover object or the newly advised function.
     */
    function afterReturning<F extends AdvisedFunction>(func: F, advice: AfterReturningAdvice): F;
    function afterReturning(target: object, method: string, advice: AfterReturningAdvice): Remover;

    /**
     * Adds `afterThrowing` advice to a method or function.
     * @returns A remover object or the newly advised function.
     */
    function afterThrowing<F extends AdvisedFunction>(func: F, advice: AfterThrowingAdvice): F;
    function afterThrowing(target: object, method: string, advice: AfterThrowingAdvice): Remover;

    /**
     * Adds `after` advice to a method or function.
     * @returns A remover object or the newly advised function.
     */
    function after<F extends AdvisedFunction>(func: F, advice: AfterAdvice): F;
    function after(target: object, method: string, advice: AfterAdvice): Remover;

    /**
     * Returns the current joinpoint, if one is active (e.g., inside an advice).
     */
    function joinpoint(): Joinpoint | undefined;

    /**
     * @deprecated Use the main `meld()` function instead.
     */
    function add<T extends object>(target: T, pointcut: Pointcut, aspect: Aspect): Remover;
    function add<F extends AdvisedFunction>(target: F, aspect: Aspect): F;
}

export = meld;
