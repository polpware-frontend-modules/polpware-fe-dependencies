// constraintjs.d.ts

// Main cjs function overloads
declare function cjs<T>(value: cjs.Constraint<T>, options?: cjs.ConstraintOptions): cjs.Constraint<T>;
declare function cjs<T>(value: T[], options?: cjs.ArrayConstraintOptions<T>): cjs.ArrayConstraint<T>;
declare function cjs<V>(value: { [key: string]: V }, options?: cjs.MapConstraintOptions<string, V>): cjs.MapConstraint<string, V>;
declare function cjs(node: Element | Element[] | NodeList): cjs.Constraint<string | string[]>;
declare function cjs<T>(value?: ((c: cjs.Constraint<T>) => T) | T, options?: cjs.ConstraintOptions): cjs.Constraint<T>;

declare namespace cjs {
    type CJSValue<T> = T | Constraint<T>;

    interface ConstraintOptions {
        auto_add_outgoing_dependencies?: boolean;
        auto_add_incoming_dependencies?: boolean;
        cache_value?: boolean;
        check_on_nullify?: boolean;
        context?: any;
        equals?: (a: any, b: any) => boolean;
        literal?: boolean;
        run_on_add_listener?: boolean;
    }

    interface ArrayConstraintOptions<T> {
        equals?: (a: T, b: T) => boolean;
        value?: T[];
    }

    interface MapConstraintOptions<K, V> {
        hash?: (key: K) => string;
        valuehash?: ((value: V) => string) | boolean;
        equals?: (a: K, b: K) => boolean;
        valueequals?: (a: V, b: V) => boolean;
        value?: { [key: string]: V };
        keys?: K[];
        values?: V[];
        literal_values?: boolean;
        create_unsubstantiated?: boolean;
    }

    interface ArrayDiff<T> {
        added: { item: T; to: number; to_item: T }[];
        removed: { from: number; from_item: T }[];
        moved: { item: T; from: number; to: number; move_from: number; insert_at: number }[];
        index_changed: { from: number; to: number; item: T; from_item: T, to_item: T }[];
        mapping: any[];
    }

    interface LivenObject {
        destroy(silent?: boolean): void;
        pause(): boolean;
        resume(): boolean;
        run(arg?: any): this;
        invalidate(): void;
    }

    interface MemoizedFunction<F extends (...args: any[]) => any> {
        (...args: Parameters<F>): ReturnType<F>;
        destroy(silent?: boolean): void;
        each(fn: (constraint: Constraint<ReturnType<F>>) => void): void;
    }

    // Classes
    class Constraint<T = any> {
        constructor(value?: ((c: Constraint<T>) => T) | T, options?: ConstraintOptions);

        get(autoAddOutgoing?: boolean): T;
        set(value: ((c: Constraint<T>) => T) | T, options?: { silent?: boolean }): this;
        setOption(key: string, value: any): this;
        setOption(options: ConstraintOptions): this;
        invalidate(): this;
        isValid(): boolean;
        remove(silent?: boolean): this;
        destroy(silent?: boolean): this;
        pauseGetter(temporaryValue: T): this;
        resumeGetter(value: T): this;
        onChange(callback: () => void, thisArg?: any, ...args: any[]): this;
        onChangeWithPriority(priority: number | false, callback: () => void, thisArg?: any, ...args: any[]): this;
        offChange(callback: () => void, thisArg?: any): this;
        inFSM(fsm: FSM, values: { [state: string]: ((c: Constraint<T>) => T) | T }): this;

        // --- Operator Methods ---
        and(...args: CJSValue<any>[]): Constraint<any>;
        or(...args: CJSValue<any>[]): Constraint<any>;
        iif<A, B>(true_val: CJSValue<A>, false_val: CJSValue<B>): Constraint<A | B>;

        prop(...propNames: string[]): Constraint<any>;
        toInt(): Constraint<number>;
        toFloat(): Constraint<number>;

        add(...args: CJSValue<any>[]): Constraint<any>;
        sub(...args: CJSValue<number>[]): Constraint<number>;
        mul(...args: CJSValue<number>[]): Constraint<number>;
        div(...args: CJSValue<number>[]): Constraint<number>;

        abs(): Constraint<number>;
        acos(): Constraint<number>;
        asin(): Constraint<number>;
        atan(): Constraint<number>;
        atan2(x: CJSValue<number>): Constraint<number>;
        cos(): Constraint<number>;
        sin(): Constraint<number>;
        tan(): Constraint<number>;
        max(...args: CJSValue<number>[]): Constraint<number>;
        min(...args: CJSValue<number>[]): Constraint<number>;
        pow(exp: CJSValue<number>): Constraint<number>;
        round(): Constraint<number>;
        floor(): Constraint<number>;
        ceil(): Constraint<number>;
        sqrt(): Constraint<number>;
        log(): Constraint<number>;
        exp(): Constraint<number>;

        pos(): Constraint<number>;
        neg(): Constraint<number>;
        not(): Constraint<boolean>;
        bitwiseNot(): Constraint<number>;
        eq(other: CJSValue<any>): Constraint<boolean>;
        neq(other: CJSValue<any>): Constraint<boolean>;
        eqStrict(other: CJSValue<any>): Constraint<boolean>;
        neqStrict(other: CJSValue<any>): Constraint<boolean>;
        gt(other: CJSValue<any>): Constraint<boolean>;
        lt(other: CJSValue<any>): Constraint<boolean>;
        ge(other: CJSValue<any>): Constraint<boolean>;
        le(other: CJSValue<any>): Constraint<boolean>;
        xor(other: CJSValue<any>): Constraint<number>;
        bitwiseAnd(other: CJSValue<any>): Constraint<number>;
        bitwiseOr(other: CJSValue<any>): Constraint<number>;
        mod(other: CJSValue<any>): Constraint<number>;
        rightShift(other: CJSValue<any>): Constraint<number>;
        leftShift(other: CJSValue<any>): Constraint<number>;
        unsignedRightShift(other: CJSValue<any>): Constraint<number>;

        typeOf(): Constraint<string>;
        instanceOf(constructor: any): Constraint<boolean>;
    }

    class ArrayConstraint<T = any> {
        static BREAK: {};
        constructor(options?: ArrayConstraintOptions<T>);

        setEqualityCheck(check: (a: T, b: T) => boolean): this;
        forEach(callback: (value: T, index: number) => void | {}, thisArg?: any): this;
        map<U>(callback: (value: T, index: number) => U, thisArg?: any): U[];
        setValue(arr: T[]): this;
        item(index?: number): T | T[];
        item(index: number, value: T): T;
        destroy(silent?: boolean): void;
        length(): number;
        push(...elements: T[]): number;
        pop(): T | undefined;
        toArray(): T[];
        indexWhere(filter: (value: T, index: number) => boolean, thisArg?: any): number;
        lastIndexWhere(filter: (value: T, index: number) => boolean, thisArg?: any): number;
        indexOf(item: T, equality_check?: (a: T, b: T) => boolean): number;
        lastIndexOf(item: T, equality_check?: (a: T, b: T) => boolean): number;
        some(filter: (value: T, index: number) => boolean, thisArg?: any): boolean;
        every(filter: (value: T, index: number) => boolean, thisArg?: any): boolean;
        splice(index: number, howMany: number, ...elements: T[]): T[];
        shift(): T | undefined;
        unshift(...elements: T[]): number;
        concat(...values: (T | T[])[]): T[];
        slice(begin?: number, end?: number): T[];
        itemConstraint(key: CJSValue<number>): Constraint<T>;
        filter(callback: (value: T) => boolean, thisObject?: any): T[];
        join(separator?: string): string;
        sort(compareFunction?: (a: T, b: T) => number): T[];
        reverse(): T[];
        toString(): string;
    }

    class MapConstraint<K = any, V = any> {
        static BREAK: {};
        constructor(options?: MapConstraintOptions<K, V>);

        keys(): K[];
        values(): V[];
        entries(): { key: K, value: V }[];
        size(): number;
        isEmpty(): boolean;
        put(key: K, value: V, index?: number, literal?: boolean): this;
        remove(key: K, silent?: boolean): this;
        get<T = V>(key: K): T | undefined;
        item(): { [key: string]: V };
        item<T = V>(key: K): T;
        item(key: K, value: V, index?: number): this;
        itemConstraint<T = V>(key: CJSValue<K>): Constraint<T>;
        clear(silent?: boolean): this;
        forEach(func: (value: V, key: K, index: number) => void | {}, thisArg?: any): this;
        setEqualityCheck(check: (a: K, b: K) => boolean): this;
        setValueEqualityCheck(check: (a: V, b: V) => boolean): this;
        setHash(hash: string | ((key: K) => string)): this;
        setValueHash(hash: string | ((value: V) => string)): this;
        indexOf(key: K): number;
        getOrPut<T = V>(key: K, create_fn: (key: K) => T, create_fn_context?: any, index?: number, literal?: boolean): T;
        has(key: K): boolean;
        moveIndex(old_index: number, new_index: number): this;
        move(key: K, to_index: number): this;
        keyForValue(value: V, eq_check?: (a: V, b: V) => boolean): K | undefined;
        destroy(silent?: boolean): void;
        toObject(key_map_fn?: (key: K) => string): { [key: string]: V };
    }

    class Binding {
        constructor(options: any);
        pause(): this;
        resume(): this;
        throttle(min_delay: number): this;
        destroy(): void;
    }

    class FSM {
        constructor(...state_names: string[]);
        state: Constraint<string>;
        addState(...state_names: string[]): this;
        getState(): string;
        addTransition(to_state: string): (...args: any[]) => void;
        addTransition(to_state: string, event: CJSEvent | ((run: () => void) => void)): this;
        addTransition(from_state: string, to_state: string): (...args: any[]) => void;
        addTransition(from_state: string, to_state: string, event: CJSEvent | ((run: () => void) => void)): this;
        destroy(): void;
        startsAt(state_name: string): this;
        is(state_name: string): boolean;
        on(spec: string, callback: (...args: any[]) => void, context?: any): this;
        off(callback: (...args: any[]) => void): this;
    }

    class CJSEvent {
        constructor(parent?: CJSEvent, filter?: (...args: any[]) => boolean, onAdd?: (t: any) => any, onRemove?: (t: any) => any);
        guard(filter: string, filter_eq: any): CJSEvent;
        guard(filter: (...event: any[]) => boolean): CJSEvent;
    }

    // Static Functions
    function constraint<T>(value?: T, options?: ConstraintOptions): Constraint<T>;
    function isConstraint(obj: any): obj is Constraint;
    function inFSM(fsm: FSM, values: { [state: string]: any }): Constraint;
    function get<T>(obj: CJSValue<T>, autoAddOutgoing?: boolean): T;
    function wait(): void;
    function signal(): void;
    function removeDependency(fromNode: Constraint, toNode: Constraint): void;
    function arrayDiff<T>(from_val: T[], to_val: T[], equality_check?: (a: T, b: T) => boolean): ArrayDiff<T>;
    function array<T>(options?: ArrayConstraintOptions<T>): ArrayConstraint<T>;
    function isArrayConstraint(obj: any): obj is ArrayConstraint;
    function map<K, V>(options?: MapConstraintOptions<K, V>): MapConstraint<K, V>;
    function isMapConstraint(obj: any): obj is MapConstraint;
    function liven(func: () => void, options?: any): LivenObject;
    function memoize<F extends (...args: any[]) => any>(getter_fn: F, options?: any): MemoizedFunction<F>;

    // DOM Bindings
    type DOMTarget = Element | Element[] | NodeList;
    function bindText(element: DOMTarget, ...values: CJSValue<any>[]): Binding;
    function bindHTML(element: DOMTarget, ...values: CJSValue<any>[]): Binding;
    function bindValue(element: DOMTarget, ...values: CJSValue<any>[]): Binding;
    function bindClass(element: DOMTarget, ...values: CJSValue<any>[]): Binding;
    function bindChildren(element: DOMTarget, ...elements: CJSValue<any>[]): Binding;
    function bindCSS(element: DOMTarget, styles: { [key: string]: CJSValue<string | number> }): Binding;
    function bindCSS(element: DOMTarget, key: string, value: CJSValue<string | number>): Binding;
    function bindAttr(element: DOMTarget, attrs: { [key: string]: CJSValue<string | number | boolean> }): Binding;
    function bindAttr(element: DOMTarget, key: string, value: CJSValue<string | number | boolean>): Binding;
    function inputValue(inp: Element | Element[]): Constraint<string | string[]>;

    // FSM & Events
    function fsm(...state_names: string[]): FSM;
    function isFSM(obj: any): obj is FSM;
    function on(event_type: string, ...targets: (Element | Window | number)[]): CJSEvent;

    // Templates
    type Template = (context: object, parent?: Element) => Node;
    function createTemplate(template: string | Element, context?: object, parent?: Element): Node | Template;
    function destroyTemplate(node: Node): typeof cjs;
    function pauseTemplate(node: Node): typeof cjs;
    function resumeTemplate(node: Node): typeof cjs;
    function registerPartial(name: string, value: Template): typeof cjs;
    function registerCustomPartial(name: string, options: any): typeof cjs;
    function unregisterPartial(name: string): typeof cjs;
    function createParsedConstraint(str: string, context: object): Constraint;

    // Utility
    const version: string;
    function toString(): string;
    function noConflict(): typeof cjs;
}

export = cjs;
