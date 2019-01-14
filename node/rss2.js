"use strict";
exports.__esModule = true;
var xml = require("xml");
var formatTime_1 = require("../src/utils/formatTime");
var DOCTYPE = '<?xml version="1.0" encoding="utf-8"?>\n';
var CDATA = function (foo) { return ({
    _cdata: foo
}); };
exports["default"] = (function (ins) {
    var options = ins.options, IToptions = ins.IToptions;
    var isAtom = false;
    var isContent = false;
    var makeITunesField = function (field, content, text, href) {
        var _a;
        if (!content)
            return undefined;
        var record = (_a = {}, _a['itunes:' + field] = content, _a);
        record._attr = { href: href, text: text };
        return record;
    };
    var ITchannel = [
        makeITunesField('summary', IToptions.summary),
        makeITunesField('author', IToptions.author),
        makeITunesField('keywords', IToptions.keywords.join(','))
    ].concat(IToptions.categories.map(function (category) {
        // TODO: recurse one level for child
        return makeITunesField('category', '', category.cat);
    }), [
        makeITunesField('image', IToptions.image),
        makeITunesField('explicit', IToptions.explicit ? 'clean' : 'explicit'),
        {
            'itunes:owner': [
                makeITunesField('name', CDATA(IToptions.owner.name)),
                makeITunesField('email', IToptions.owner.email),
            ]
        },
        // subtitle
        makeITunesField('type', IToptions.type),
    ]);
    var channel = [
        {
            'atom:link': {
                _attr: {
                    href: invariant(options.feedLinks, 'rss', 'missing in your feed channel config options'),
                    rel: 'self',
                    type: 'application/rss+xml'
                }
            }
        },
        { title: options.title },
        { link: options.link },
        { language: 'en' },
        { description: options.description },
        { managingEditor: options.author },
        {
            pubDate: options.updated // TODO: use actual last pub date
                ? options.updated.toUTCString()
                : new Date().toUTCString()
        },
        ,
        {
            lastBuildDate: options.updated
                ? options.updated.toUTCString()
                : new Date().toUTCString()
        },
        { docs: options.link },
        {
            generator: options.generator ||
                'https://github.com/sw-yx/react-static-typescript-starter'
        }
    ].concat(ITchannel);
    var rss = [{ _attr: { version: '2.0' } }, { channel: channel }];
    /**
     * Channel Image
     * http://cyber.law.harvard.edu/rss/rss.html#ltimagegtSubelementOfLtchannelgt
     */
    if (options.image) {
        channel.push({
            image: [
                { title: options.title },
                { url: options.image },
                { link: options.link },
            ]
        });
    }
    /**
     * Channel Copyright
     * http://cyber.law.harvard.edu/rss/rss.html#optionalChannelElements
     */
    if (options.copyright) {
        channel.push({ copyright: options.copyright });
    }
    /**
     * Channel Categories
     * http://cyber.law.harvard.edu/rss/rss.html#comments
     */
    ins.categories.forEach(function (category) {
        channel.push({ category: category });
    });
    /**
     * Feed URL
     * http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
     */
    var atomLink = options.feed || (options.feedLinks && options.feedLinks.atom);
    if (atomLink) {
        isAtom = true;
        channel.push({
            'atom:link': {
                _attr: {
                    href: atomLink,
                    rel: 'self',
                    type: 'application/rss+xml'
                }
            }
        });
    }
    /**
     * Hub for PubSubHubbub
     * https://code.google.com/p/pubsubhubbub/
     */
    if (options.hub) {
        isAtom = true;
        channel.push({
            'atom:link': {
                _attr: {
                    href: options.hub,
                    rel: 'hub'
                }
            }
        });
    }
    /**
     * Channel Categories
     * http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
     */
    ins.items.forEach(function (entry) {
        var item = [];
        if (entry.title) {
            item.push({ title: CDATA(entry.title) });
        }
        if (entry.link) {
            item.push({ link: CDATA(entry.link) });
            // item.push({ link: entry.link })
        }
        if (entry.guid) {
            item.push({ guid: entry.guid });
        }
        else if (entry.link) {
            item.push({ guid: entry.link });
        }
        if (entry.date) {
            item.push({ pubDate: entry.date.toUTCString() });
        }
        if (entry.description) {
            item.push({ description: CDATA(entry.description) });
        }
        if (entry.content) {
            isContent = true;
            item.push({ 'content:encoded': CDATA(entry.content) });
        }
        /**
         * Item Author
         * http://cyber.law.harvard.edu/rss/rss.html#ltauthorgtSubelementOfLtitemgt
         */
        if (Array.isArray(entry.author)) {
            entry.author.map(function (author) {
                if (author.email && author.name) {
                    item.push({ author: author.email + ' (' + author.name + ')' });
                }
            });
        }
        if (entry.image) {
            item.push({ enclosure: [{ _attr: { url: entry.image } }] });
        }
        var itunes = entry.itunes;
        if (itunes) {
            // item.push(
            //   makeITunesField(
            //     'image',
            //     '',
            //     undefined,
            //     itunes.image || IToptions.image,
            //   ),
            // )
            item.push({
                guid: {
                    _attr: {
                        isPermaLink: 'false'
                    },
                    _cdata: invariant(itunes, 'mp3URL')
                }
            });
            item.push({
                enclosure: {
                    _attr: {
                        length: invariant(itunes, 'enclosureLength'),
                        type: 'audio/mpeg',
                        url: invariant(itunes, 'mp3URL')
                    }
                }
            });
            // item.push(
            //   makeITunesField('image', '', undefined, itunes.image || options.image),
            // )
            item.push(makeITunesField('duration', formatTime_1.formatTime(itunes.duration)));
            item.push(makeITunesField('explicit', itunes.explicit ? 'yes' : 'no'));
            if (itunes.keywords && itunes.keywords.length)
                item.push(makeITunesField('keywords', itunes.keywords.join(',')));
            item.push(makeITunesField('subtitle', CDATA(invariant(itunes, 'subtitle'))));
            item.push(makeITunesField('episodeType', itunes.episodeType));
            item.push(makeITunesField('episode', itunes.episode));
            item.push(makeITunesField('season', itunes.season));
            item.push({
                'content:encoded': CDATA(itunes.contentEncoded)
            });
        }
        channel.push({ item: item });
    });
    if (isContent) {
        rss[0]._attr['xmlns:content'] = 'http://purl.org/rss/1.0/modules/content/';
    }
    if (isAtom) {
        rss[0]._attr['xmlns:atom'] = 'http://www.w3.org/2005/Atom';
    }
    // rest
    rss[0]._attr['xmlns:cc'] = 'http://web.resource.org/cc/';
    rss[0]._attr['xmlns:itunes'] = 'http://www.itunes.com/dtds/podcast-1.0.dtd';
    rss[0]._attr['xmlns:media'] = 'http://search.yahoo.com/mrss/';
    rss[0]._attr['xmlns:rdf'] = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    return DOCTYPE + xml([{ rss: rss }], true);
});
function invariant(obj, key, msg) {
    if (!obj[key]) {
        var errmsg = key + (msg || ' is missing from your frontmatter');
        console.error(errmsg + '\n ---- \n error found in', obj);
        throw new Error(errmsg);
    }
    return obj[key];
}
