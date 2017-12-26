define([
    'jquery',
    'meld',
    'locache',
    'underscore',
    'constraintjs',
    'data-flow',
    'state-machine',
    'backbone',
    'backbone-paginator'
], function($,
            meld,
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
        'locache': locache,
        'underscore': _,
        'constraintjs': cjs,
        'data-flow': flow,
        'backbone': backbone,
        'state-machine': stateMachine
    };
});

