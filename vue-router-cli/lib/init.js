const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const { clone } = require("./download");
const open = require("open");

// 可以在终端输出绿色的字体
const log = (msg) => console.log(chalk.green(msg));

/**
 * 对接输出流
 * @param  {...any} args
 * @returns
 */
const promisitySpawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  // 清屏
  clear();
  // 在命令行里显示艺术字
  const msg = await figlet("VRC welcome");
  log(msg);
  // 创建项目
  log(`🚀创建项目：${name}`);
  // 从github克隆项目到指定文件夹
  await clone("github:banixing/vue-template", name);

  log("安装依赖");
  await promisitySpawn("npm", ["install"], { cwd: `./${name}` });
  log(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `);

  open("http://localhost:8080");
  await promisitySpawn("npm", ["run", "serve"], { cwd: `./${name}` });
};
