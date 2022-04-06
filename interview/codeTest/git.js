/**
 * 每个commit都有一个unique id
 * 可以打开vscode里的terminal，看每次git操作的命令
 * 提交前：
 * git log 看git commit 记录
 * git diff 对比git 记录
 * git status 看git现在状态
 * git add后 就会进入 stage
 * git restore + 文件路径 让修改的文件撤销修改 (在unstage的情况下)
 * git stash 把修改暂存到抽屉里,可以有好几个 stash
 * git apply stash 把修改拿出来
 * git reset + 文件路径 就会让staged文件回到untracked 状态, 就是vscode里的discard
 *
 * 提交后：
 * git revert + unique id 用新的commit对之前记录进行回滚 (可以对revert的commit进行 revert)，加上unique id
 * git reset + unique id 从历史记录中删除 commit，往后的记录的commit也全部删除 （最好别用简单粗暴的删除，不能让git记录 有迹可循）
 * soft: 修改保留进stage,
 * hard:完全删除
 *
 */
