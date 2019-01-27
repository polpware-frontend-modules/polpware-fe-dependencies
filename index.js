define([
    'jquery',
    'meld',
    'when',
    'locache',
    'underscore',
    'constraintjs',
    'dataflow',
    'statemachine',
    'backbone',
    'backbonepaginator'
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
        'data-flow': flow,
        'backbone': backbone,
        'state-machine': stateMachine
    };
});

