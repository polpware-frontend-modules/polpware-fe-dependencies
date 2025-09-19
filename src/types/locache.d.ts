// src/types/locache.d.ts

/**
 * Defines the interface for a storage backend used by locache,
 * such as localStorage or sessionStorage.
 */
interface LocacheStorageBackend {
    set(key: string, value: string): void;
    get(key: string): string | null;
    remove(key: string): void;
    length(): number;
    key(index: number): string | null;
    enabled(): boolean;
}

/**
 * Describes the methods available on a locache cache instance.
 */
interface LocacheCache {
    /**
     * Asynchronous methods that return Promises.
     */
    async: {
        /**
         * Asynchronously retrieves an item from the cache.
         * @param key The key of the item to retrieve.
         * @returns A Promise that resolves with the stored value, or null if not found.
         */
        get<T = any>(key: string): Promise<T | null>;

        /**
         * Asynchronously stores an item in the cache.
         * @param key The key to store the value under.
         * @param value The value to store. It must be JSON-serializable.
         * @param seconds The number of seconds until the item expires.
         * @returns A Promise that resolves when the item is set.
         */
        set(key: string, value: any, seconds?: number): Promise<void>;
    };

    /**
     * Retrieves an item from the cache.
     * @param key The key of the item to retrieve.
     * @returns The stored value, or null if not found.
     */
    get<T = any>(key: string): T | null;

    /**
     * Stores an item in the cache.
     * @param key The key to store the value under.
     * @param value The value to store. It must be JSON-serializable.
     * @param seconds The number of seconds until the item expires.
     */
    set(key: string, value: any, seconds?: number): void;

    /** Removes an item from the cache. */
    remove(key: string): void;

    /**
     * Increments a numeric value in the cache. If the key does not exist, it is initialized to 0 before incrementing.
     * @returns The new value.
     */
    incr(key: string): number;

    /**
     * Decrements a numeric value in the cache. If the key does not exist, it is initialized to 0 before decrementing.
     * @returns The new value.
     */
    decr(key: string): number;

    /**
     * Stores multiple items in the cache.
     * @param properties An object of key/value pairs to store.
     * @param seconds The number of seconds until the items expire.
     */
    setMany(properties: { [key: string]: any }, seconds?: number): void;

    /**
     * Retrieves multiple items from the cache.
     * @param keys An array of keys to retrieve.
     * @returns An object mapping the requested keys to their stored values.
     */
    getMany<T = any>(keys: string[]): { [key: string]: T | null };

    /**
     * Retrieves multiple items from the cache as an array of values.
     * @param keys An array of keys to retrieve.
     * @returns An array of values in the same order as the requested keys.
     */
    getManyValues<T = any>(keys: string[]): (T | null)[];

    /** Removes multiple items from the cache. */
    removeMany(keys: string[]): void;

    /** Deletes all items from the cache that were stored by this locache instance. */
    flush(): void;

    /** Returns the number of items currently in the cache for this instance. */
    length(): number;

    /** Returns an array of all keys currently in the cache for this instance. */
    keys(): string[];

    /** Removes all expired items from the cache. */
    cleanup(): void;
}

/**
 * Describes the main global 'locache' object.
 */
interface LocacheStatic extends LocacheCache {
    /** The version number of the locache library. */
    readonly VERSION: string;
    /** A boolean indicating if the browser supports localStorage. */
    readonly supportsLocalStorage: boolean;
    /** A boolean indicating if the browser supports sessionStorage. */
    readonly supportsSessionStorage: boolean;
    /** A boolean indicating if the browser supports native JSON parsing. */
    readonly supportsNativeJSON: boolean;
    /** A boolean indicating if the browser supports postMessage. */
    readonly supportsPostMessage: boolean;

    /** An instance of locache that uses sessionStorage as the backend. */
    session: LocacheCache;

    /** The available storage backends (local and session). */
    backends: {
        local: LocacheStorageBackend;
        session: LocacheStorageBackend;
    };

    /**
     * Factory method to create a new, isolated locache instance.
     * @param options An options object, e.g., to specify a storage backend.
     */
    createCache(options?: { storage: LocacheStorageBackend }): LocacheCache;
}

/**
 * Declares the global 'locache' variable that exists at runtime.
 */
declare var locache: LocacheStatic;

/**
 * Ensures this file is treated as a module.
 */
export { };
