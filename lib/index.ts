import { promises as fs } from "fs";
import path from "path";

class AssetManager {
    dir: string;
    loaded: boolean;
    data: Record<string, string>;

    constructor(dir: string) {
        this.dir = dir;
        this.loaded = false;
        this.data = {};
    }

    async load() {
        const files = await fs.readdir(this.dir);

        for (const file of files) {
            const name = file.split(".")[0];
            this.data[name] = `${this.dir}/${file}`;
        }

        this.loaded = true;
    }

    clear() {
        this.data = {};
        this.loaded = false;
    }

    get(name: string) {
        return this.data[name];
    }
}

export = {
    font: new AssetManager(path.join(__dirname, "data", "fonts")),
    image: new AssetManager(path.join(__dirname, "data", "images")),
    utils: {
        AssetManager
    }
};