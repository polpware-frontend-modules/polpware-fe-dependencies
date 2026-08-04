// model-js.d.ts

/**
 * The main instance of a Model object, which holds reactive properties.
 */
interface ModelInstance {
    /**
     * Sets up a reactive callback that is invoked when a set of properties change.
     *
     * @param properties An array of property names or a single property string.
     * @param callback A function that is called with property values as arguments,
     * ordered corresponding to the properties array. It is invoked only if all
     * specified properties have values.
     * @param thisArg The `this` context for the callback. Defaults to the model instance.
     * @returns A listener handle that can be passed to `model.cancel()` to remove the listener.
     */
    when(
        properties: string | string[],
        callback: (...values: any[]) => void,
        thisArg?: any
    ): (...args: any[]) => void;

    /**
     * Adds a change listener for a given property. The callback is invoked
     * with the new and old values whenever the property is set.
     *
     * @param property The name of the property to listen to.
     * @param callback A function called with (newValue, oldValue).
     * @param thisArg The `this` context for the callback. Defaults to the model instance.
     */
    on<T = any>(
        property: string,
        callback: (newValue: T, oldValue: T) => void,
        thisArg?: any
    ): void;

    /**
     * Sets all of the given values on the model.
     * @param newValues An object of { property -> value } pairs.
     */
    set(newValues: { [key: string]: any }): void;

    /**
     * Removes a change listener added with `model.on()`.
     * @param property The name of the property.
     * @param callback The original callback function to remove.
     */
    off<T = any>(
        property: string,
        callback: (newValue: T, oldValue: T) => void
    ): void;

    /**
     * Cancels a listener returned by a call to `model.when()`.
     * @param listener The listener handle returned by `model.when()`.
     */
    cancel(listener: (...args: any[]) => void): void;

    /**
     * Allows setting or getting arbitrary properties on the model instance.
     */
    [key: string]: any;
}

/**
 * The constructor for creating Model instances.
 */
interface ModelConstructor {
    /**
     * Creates a new Model instance.
     * @param defaults An optional object containing default key-value pairs to set on the model.
     */
    new(defaults?: { [key: string]: any }): ModelInstance;

    /**
     * A special value representing an optional property that is not specified.
     * This allows `when()` listeners to be invoked even if some properties are undefined.
     */
    None: any;
}

declare var Model: ModelConstructor;

export = Model;
