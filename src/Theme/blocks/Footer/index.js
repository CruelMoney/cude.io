import React from "react";
import { Grid, Row, Col } from "react-styled-flexboxgrid";
import { fetcher, Icons } from "cude-cms";
import styles from "./index.module.css";
let { Github, Twitter, Snapchat, Instagram, ...IconsRest } = Icons;

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<div className={styles.me}>
					<p>
						<span>Christopher Ulrick Dengsø</span> <br />
						{/* {data.address.suburb + ", " + data.address.country} <br/>
                    <a href={"tel:"+data.phone}>{data.phone}</a> <br/>
                    <a href={"mailto:"+data.email}>{data.email}</a> <br/>
                    CVR: {data.cvr} */}
					</p>
				</div>
				<div className={styles.social}>
					<a href="https://twitter.com/ChrisDengso">
						<Twitter className={styles.twitter} />
					</a>
					<a href="https://www.instagram.com/cruelmoneyyy/">
						<Instagram className={styles.instagram} />
					</a>
					<a href="https://github.com/CruelMoney/">
						<Github className={styles.github} />
					</a>
				</div>
			</footer>
		);
	}
}

export default fetcher(Footer, "/api/configuration");
