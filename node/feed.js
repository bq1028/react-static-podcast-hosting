"use strict";
// adapted from https://github.com/jpmonette/feed
exports.__esModule = true;
// import renderAtom from './atom1'
// import renderJSON from './json'
var rss2_1 = require("./rss2");
var Feed = /** @class */ (function () {
    function Feed(options, IToptions) {
        var _this = this;
        this.items = [];
        this.categories = [];
        this.contributors = [];
        this.extensions = [];
        this.addItem = function (item) { return _this.items.push(item); };
        this.addCategory = function (category) { return _this.categories.push(category); };
        this.addContributor = function (contributor) {
            return _this.contributors.push(contributor);
        };
        this.addExtension = function (extension) {
            return _this.extensions.push(extension);
        };
        // /**
        //  * Returns a Atom 1.0 feed
        //  */
        // public atom1 = (): string => renderAtom(this)
        /**
         * Returns a RSS 2.0 feed
         */
        this.rss2 = function () { return rss2_1["default"](_this); };
        this.options = options;
        this.IToptions = IToptions;
    }
    return Feed;
}());
exports.Feed = Feed;
