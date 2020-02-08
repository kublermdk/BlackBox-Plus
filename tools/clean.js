import del from 'del';

// 清除构建文件
del(['.tmp', 'build/*', '!build/.git'], { dot: true }).then(paths => {
    console.log('删除的文件和文件夹:\n', paths.join('\n'));
});

