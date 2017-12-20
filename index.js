define([
    'jquery',
    'meld',
    'locache',
    'underscore',
    'constraintjs',
    'backbone',
    'backbone-paginator'
], function($,
            meld,
            locache,
            _,
            cjs,
            backbone) {

    'use strict';

    return {
        'jquery': $,
        'meld': meld,
        'locache': locache,
        'underscore': _,
        'constraintjs': cjs,
        'backbone': backbone
    };
});

