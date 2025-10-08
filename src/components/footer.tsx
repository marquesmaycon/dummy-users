import { Button, Space, Typography } from "antd"
import { Footer as FooterAntd } from "antd/es/layout/layout"

const { Text } = Typography

export default function Footer() {
	return (
		<FooterAntd style={{ textAlign: "center" }}>
			<Space>
				<Text type="secondary">
					Dummy Users ©{new Date().getFullYear()} Created by
				</Text>
				<a
					href="https://github.com/marquesmaycon"
					target="_blank"
					rel="noreferrer"
				>
					<Button variant="link" type="link" style={{ fontWeight: "500" }}>
						Maycon Marques
					</Button>
				</a>
			</Space>
		</FooterAntd>
	)
}
