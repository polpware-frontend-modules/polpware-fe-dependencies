define([
    'jquery',
    'meld',
    'when',
    'locache',
    'underscore',
    'constraintjs',
    'data-flow',
    'state-machine',
    'backbone',
    'backbone-paginator'
], function($,
            meld,
            when,
            locache,
            _,
            cjs,
            flow,
            stateMachine,
            backbone) {

    'use strict';

    return {
        'jquery': $,
        'meld': meld,
        'when': when,
        'locache': locache,
        'underscore': _,
        'constraintjs': cjs,
        'dataflow': flow,
        'backbone': backbone,
        'statemachine': stateMachine
    };
});

