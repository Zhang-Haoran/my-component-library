/**
 * 每个commit都有一个unique id
 * 可以打开vscode里的terminal，看每次git操作的命令
 * 提交前：
 * git remote add + name + url添加远程仓库
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
 * --soft: 修改保留进stage,
 * --hard:完全删除
 * git checkout -b + 名字 在本地新建branch,云端上还不存在
 * git branch -d 删除branch
 * git branch 列出所有branch
 * git log --all --decorate --oneline --graph 查看图形界面
 * git merge + branch name 合并分支代码。先checkout到需要拉入代码的branch，再选择别的开发好的branch。成功后，之后在push一下，更新一下当前branch
 *
 *
 * origin/main 带origin代表remote server
 * main 代表本地branch
 *
 * git rebase: linear history. 先checkout到需要拉入代码的branch，再选择别的开发好的branch. rebase 后只会有一条线
 * git rebase -i: interactive rebase 对commit history进行合并操作，多个commit可能合并为一个
 * git merge: 两条线
 */
