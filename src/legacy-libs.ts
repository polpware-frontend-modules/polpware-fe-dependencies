// src/legacy-libs.ts

// 1. Imports using the `esModuleInterop` pattern
import StateMachine from 'javascript-state-machine';
import _ from 'underscore'; // Added underscore as it's a dependency for Backbone

// 2. Imports for classic CommonJS modules
import meld from 'meld';
import Model from 'model-js';
import cjs from 'constraintjs';

// 3. Import for side-effects (plugins)
// This runs the plugin code, which attaches itself to the Backbone object.

// 4. No import needed for globals like locache.
// Your custom `locache.d.ts` file makes it available via `declare var locache`.

// --- Type Exports (Optional but good practice) ---
export type UnderscoreStatic = typeof _;
export type StateMachineStatic = typeof StateMachine;
export type MeldStatic = typeof meld;
export type ModelJsStatic = typeof Model;
export type CjsStatic = typeof cjs;


/**
 * A single object that consolidates all legacy libraries for easy access.
 */
export const legacyLibs = {
    /** jQuery: DOM manipulation library. Imported via default import. */
    $: $,

    /** Backbone: MVC framework. Imported via default import. */
    Backbone: Backbone,

    /** Underscore: Utility library, a dependency for Backbone. Imported via default import. */
    _: _,

    /** javascript-state-machine: Finite State Machine library. Imported via default import. */
    StateMachine: StateMachine,

    /** meld: Aspect-oriented programming library. Imported via `import = require()`. */
    meld: meld,

    /** model-js: A functional reactive model library. Imported via `import = require()`. */
    ModelJs: Model,

    /** constraintjs: A constraint-based programming library. Imported via `import = require()`. */
    cjs: cjs,

    /** when: A promise library. Imported via `import = require()`. */
    // when: when,

    /** locache: A global caching library. Referenced directly from the window object. */
    locache: locache
};
