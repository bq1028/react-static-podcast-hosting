// adapted from https://github.com/jpmonette/feed
// import renderAtom from './atom1'
// import renderJSON from './json'
import renderRSS from './rss2';
export class Feed {
    constructor(options, IToptions) {
        this.items = [];
        this.categories = [];
        this.contributors = [];
        this.extensions = [];
        this.addItem = (item) => this.items.push(item);
        this.addCategory = (category) => this.categories.push(category);
        this.addContributor = (contributor) => this.contributors.push(contributor);
        this.addExtension = (extension) => this.extensions.push(extension);
        // /**
        //  * Returns a Atom 1.0 feed
        //  */
        // public atom1 = (): string => renderAtom(this)
        /**
         * Returns a RSS 2.0 feed
         */
        this.rss2 = () => renderRSS(this);
        this.options = options;
        this.IToptions = IToptions;
    }
}
