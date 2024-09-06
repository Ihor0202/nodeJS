const path = require('node:path');
const fs = require('node:fs/promises')

const foo = async () => {
    try {
        const pathToDir = path.join(__dirname, 'baseFolder')
        await fs.mkdir(pathToDir, {recursive: true})
        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', "folder5"]
        const fileNames = ['file1.txt', 'file2.txt', "file3.txt", 'file4.txt', "file5.txt"]

        await Promise.all(
            folderNames.map( async (folder) => {
                const folderPath = path.join(pathToDir, folder)
                await fs.mkdir(folderPath, {recursive: true})
                await Promise.all(
                    fileNames.map(async (file) => {
                        const filePath = path.join(folderPath, file)
                        // await fs.mkdir(filePath, {recursive: true})
                        await fs.writeFile(filePath, 'hello world')
                    }))
            })
        )

        const data = await fs.readdir(pathToDir)
        for (const folder of data) {
            const folderPath = path.join(pathToDir, folder)

            const stateFolder = await fs.stat(folderPath)
            console.log('folder: '+ folder, 'isDirectory ' + stateFolder.isDirectory())

            const item = await fs.readdir(folderPath)
            console.log('file: '+ folder + ' ' + item)

            const files = await fs.readdir(folderPath)


            // const files = await fs.readFile(folderPath)
            for (const file of files) {

                const filePath = path.join(folderPath, file)
                const stateFile = await fs.stat(filePath)

                console.log('file: '+ file, 'isFile ' + stateFile.isFile())
            }

        }

    } catch (e) {
        console.log(e.message)
    }
}

foo()

