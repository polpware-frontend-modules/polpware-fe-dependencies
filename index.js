define([
    'jquery',
    'meld',
    'locache',
    'underscore',
    'constraintjs',
    'data-flow',
    'backbone',
    'backbone-paginator'
], function($,
            meld,
            locache,
            _,
            cjs,
            flow,
            backbone) {

    'use strict';

    return {
        'jquery': $,
        'meld': meld,
        'locache': locache,
        'underscore': _,
        'constraintjs': cjs,
        'data-flow': flow,
        'backbone': backbone
    };
});

