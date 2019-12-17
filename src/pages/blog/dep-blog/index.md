---
title: 构建一个Blog
date: "2019-12-13"
description: "记录构建这个Blog的过程"
---

这个 Blog 我选了一个我很不熟悉的技术栈，假装这就是跳出舒适圈吧。

![002](./002.jpg)

先说说我的诉求，我希望我的 Blog 可控性比较高，这样方便我做一些自己想做的事情。然后我希望它尽可能的简洁跟简单，个人有点极简主义。然后我希望 Blog 的内容使用 MarkDown 编写，最后我希望它可以自动部署，我 push 到 Github 就可以自动发布。

好吧，就这些，让我们开始吧。

### 基础架构

[Gatsby](https://github.com/gatsbyjs/gatsby) 是一个很优秀的基于 React 的开源架构，使用它，你可以很方便的构建你的网站，它已经帮你做了很多事情。我很久前就有学习它的计划，但一直搁置，这次我选择使用它。

使用 Gatsby 跟我使用之前的 React 架构最大的区别应该是在数据资源层上，Gatsby 有一个内置的数据层，是基于 [GraphQL](https://graphql.org/) 的，这个数据层包含了你开发过程需要的所有资源，比如，图片、视频、JSON 数据等。GraphQL 是一种查询语言，我在几年前就开始关注，但因为使用起来需要涉及到服务端的改造，就一直停留在只会基础的使用阶段，没有深入了解，我计划会在另一篇博客中在讲讲我的理解，这里就不明细说了。

### Markdown

使用 Gatsby 开发 Blog 系统，markdown 文件也是一种静态资源，在开发过程中使用 GraphQL 可以获取到，例如：

```js{8-17}
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
      }
    }
  }
`
```

其中 8-17 行就是使用`gatsby-transformer-remark`插件来解析 Markdown 的过程，Gatsby 的[插件](https://www.gatsbyjs.org/plugins/)功能很强大，官方和社区也提供了很多很优秀的插件，可以极大的简化开发过程。

### 自动发布

开始处理自动发布需求，虽然网上有很多类似的架构跟教程，但我觉得既然底层原理很简单，还是自己实现一个，这样比较好控制。

自动发布的核心是 Git 的 Hook 机制，在 Github 里对应的是 Settings 页面的 Webhooks 选项，可以让用户填写一个 API，在你的库发生改变的时候就自动调用里设置的 API。

然后我用 node 的 [Express](https://expressjs.com/zh-cn/) 在服务端运行了一个 Web 程序，通过 [shelljs](https://documentup.com/shelljs/shelljs) 这个库来执行一个写好的脚本，在脚本里做安装依赖、编译、重启 Nginx 的操作，这样看起来一个简单的自动化发布系统就做好了，虽然很简陋。

### 总结

到目前为止，我的需求都已经满足了，一个干净的用 Markdown 编写的可以自动发布的 Blog 系统。其实还有很多细节跟踩坑我没细说，主要是因为我不太会把控技术细节跟描述文字之间的界线，担心太多的技术内容导致阅读体验下降。

目前我还在构思评论系统如何构建，希望以后能从评论的反馈来提高阅读体验。

我比较喜欢兴趣式学习方式，所以我也用这种方式来学习前端技术，就像你看到的这个 Blog，因为兴趣，我在这个过程中学习了使用 Gatsby，学习了自动发布等工作中会遇到的一些技术，我很喜欢这种方式跟节奏。
