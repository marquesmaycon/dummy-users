import { MoonOutlined, SunOutlined } from "@ant-design/icons"
import { Button } from "antd"

import { useTheme } from "../hooks/theme"

export default function ThemeSwitcher() {
	const { toggleTheme, isDarkMode } = useTheme()

	return (
		<Button
			type="text"
			icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
			onClick={toggleTheme}
			title={`Mudar para tema ${isDarkMode ? "claro" : "escuro"}`}
		>
			{isDarkMode ? "Claro" : "Escuro"}
		</Button>
	)
}
