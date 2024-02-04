const fs = require('fs').promises; // Notice the .promises here
const path = require('path');

const getStories = async () => {
    console.log('FETCHING STORIES');
    const directoryPath = path.join(__dirname, '..', 'public', 'story');
    try {
        const files = await fs.readdir(directoryPath, { withFileTypes: true });
        const folders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        return folders;
    } catch (error) {
        console.log('ERROR FETCHING STORIES', error);
    }
}

module.exports = getStories;
