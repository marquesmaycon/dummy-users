import { ConfigProvider, theme } from "antd"
import { useTheme } from "../contexts/theme-context"

export function AntdConfigProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const { isDarkMode } = useTheme()
	return (
		<ConfigProvider
			theme={{
				algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
				components: {
					Layout: {
						headerBg: isDarkMode ? "#001529" : "#dceeffff",
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	)
}
