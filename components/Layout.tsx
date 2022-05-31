import { Text, View } from 'react-native';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<View
			style={{
				height: '100%',
				width: '100%',
			}}
		>
			{/* <Header /> */}
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{children}
			</View>
			<Footer />
		</View>
	);
}
