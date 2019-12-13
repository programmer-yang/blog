import React from "react"
import { Link } from "gatsby"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import MoonOrSun from "./moonorsun"

import { rhythm, scale } from "../utils/typography"

import styles from "./layout.less"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          color: "var(--textNormal)",
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          fontFamily: "PingFangSC-Medium, sans-serif, Microsoft YaHei",
        }}
      >
        <header style={{ position: "relative", color: "var(--textTitle)" }}>
          {header}
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <MoonOrSun
                className={styles.action}
                isDark={theme === "dark"}
                onChange={bool => toggleTheme(bool ? "dark" : "light")}
              />
            )}
          </ThemeToggler>
        </header>
        <main>{children}</main>
        <footer>
          <a href="https://www.gatsbyjs.org">Github</a>
        </footer>
      </div>
    )
  }
}

export default Layout
