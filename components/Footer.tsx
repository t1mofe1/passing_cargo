import { FontAwesome5 } from '@expo/vector-icons';
import { Link, useRoute } from '@react-navigation/native';
import { StyleProp, View, ViewStyle } from 'react-native';
import { stylesConst } from '../constants/Styles';
import useTheme from '../hooks/useTheme';
import { RootStackParamList } from '../navigation';

export default function Footer() {
	const { name: routeName } = useRoute();

	const { theme } = useTheme();

	const routeColor = (route: keyof RootStackParamList) => (routeName === route ? theme.colors.tabIconSelected : theme.colors.tabIconDefault);

	const styles: { [key: string]: StyleProp<any> } = {
		footerContainer: {
			// ...stylesConst.flex,
			justifyContent: 'space-around',
			backgroundColor: theme.colors.background,
			padding: 20,
			paddingBottom: 40,
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
			borderStyle: 'solid',
			borderColor: theme.colors.border,
			borderTopWidth: 1,
			borderRightWidth: 1,
			borderLeftWidth: 1,
			width: '102%',
			marginLeft: '-1%',
		},
		createDeliveryBtn: {
			width: 50,
			height: 50,
			backgroundColor: '#29AA88',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'row',
			borderRadius: 50,
		},
	};

	return (
		<View style={styles.footerContainer}>
			<Link to={{ screen: 'Home' }}>
				<FontAwesome5 name='home-alt' size={28} color={routeColor('Home')} />
				{/* Variants: home | home-alt */}
			</Link>
			<Link to={{ screen: 'Chats' }}>
				<FontAwesome5 name='comment-alt' size={28} color={routeColor('Chats')} />
				{/* Variants: comment | comment-alt | comment-alt-dots | comment-alt-lines | comment-dots | comment-lines | comments | comments-alt | envelope | envelope-open | inbox */}
			</Link>
			{/* <Link to={{ screen: 'AddDelivery' }}> */}
			<View>
				<FontAwesome5 name='plus' size={22} color={'#fff'} />
			</View>
			{/* </Link> */}
			<Link to={{ screen: 'Deliveries' }}>
				<FontAwesome5 name='truck' size={28} color={routeColor('Deliveries')} />
				{/* Variants: truck | truck-loading | truck-moving | archive | box | box-alt | box-open | box-up | apple-crate | shipping-fast | conveyor-belt | conveyor-belt-alt */}
			</Link>
			<Link to={{ screen: 'Profile' }}>
				<FontAwesome5 name='user' size={28} color={routeColor('Profile')} />
				{/* Variants: user | user-alt | user-circle | id-card | id-card-alt | id-badge | address-card */}
			</Link>
		</View>
	);
}
