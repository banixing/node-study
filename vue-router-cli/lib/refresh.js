const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");

/**
 * 编译模板文件
 * @param {*} meta 数据定义
 * @param {*} filePath 目标文件路径
 * @param {*} templatePath 模板文件路径
 */
function compileFile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const reslut = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, reslut);
    console.log(chalk.red(`🚀${filePath} 创建成功`));
  }
}

module.exports = async () => {
  // 1. 获取页面列表
  const list = fs
    .readdirSync("./src/pages")
    .filter((f) => f !== "Home.vue")
    .map((f) => ({
      name: f.replace(".vue", "").toString(),
      file: f,
    }));
  // 2. 生成路由
  compileFile(
    {
      list,
    },
    "./src/router.js",
    "./template/router.js.hbs"
  );

  // 3. 生成菜单
  compileFile(
    {
      list,
    },
    "./src/App.vue",
    "./template/App.vue.hbs"
  );
};