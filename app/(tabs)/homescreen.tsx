import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {

  const activities = [
    { title: 'EARTHQUAKE\nRESISTANT\nSTRUCTURE', icon: require('../../assets/images/building.png') },
    { title: 'PARACHUTE\nDROP\nCHALLENGE', icon: require('../../assets/images/parachute.png') },
    { title: 'REACTION\nBOARD\nLAB', icon: require('../../assets/images/lightning.png') },
    { title: 'HUMAN\nPERFORMANCE\nLAB', icon: require('../../assets/images/human.png') },
    { title: 'HAND FAN\nCHALLENGE', icon: require('../../assets/images/fan.png') },
    { title: 'SOUND\nPOLLUTION\nHUNTER', icon: require('../../assets/images/sound.png') },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image source={require('../../assets/images/menu.png')} style={styles.icon} />
          <Text style={styles.logo}>STEMM LAB</Text>
          <Image source={require('../../assets/images/user1.png')} style={styles.icon} />
        </View>

        {/* WELCOME */}
        <LinearGradient
          colors={['#6D28D9', '#4C1D95']}
          style={styles.welcomeCard}
        >
          <Text style={styles.welcomeText}>
            WELCOME BACK VALENCIA
          </Text>
        </LinearGradient>

        {/* TITLE */}
        <Text style={styles.section}>AVAILABLE ACTIVITIES</Text>

        {/* GRID */}
        <View style={styles.grid}>
          {activities.map((item, index) => (
            <TouchableOpacity key={index} activeOpacity={0.85} style={styles.cardWrapper}>
              <View style={styles.card}>
                <Image source={item.icon} style={styles.cardIcon} />
                <Text style={styles.cardText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <LinearGradient
          colors={['#FACC15', '#F59E0B']}
          style={styles.cta}
        >
          <Image source={require('../../assets/images/trophy.png')} style={styles.ctaIcon} />
          <View>
            <Text style={styles.ctaTitle}>KEEP EXPLORING!</Text>
            <Text style={styles.ctaText}>
              Complete activities, earn badges and level up your team!
            </Text>
          </View>
        </LinearGradient>

      </ScrollView>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <NavItem icon={require('../../assets/images/home1.png')} label="HOME" active />
        <NavItem icon={require('../../assets/images/rocket.png')} label="ACTIVITIES" />
        <NavItem icon={require('../../assets/images/leaderboard.png')} label="LEADERBOARD" />
      </View>
    </View>
  );
}

const NavItem = ({ icon, label, active = false }: any) => (
  <TouchableOpacity style={styles.navItem}>
    <Image
      source={icon}
      style={[
        styles.navIcon,
        active && { tintColor: '#FACC15' }
      ]}
    />
    <Text style={[styles.navText, active && { color: '#FACC15' }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 60, // safer spacing
  },

  icon: {
    width: 28,
    height: 28,
    tintColor: '#fff'
  },

  logo: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 22,
  },

  welcomeCard: {
    marginTop: 20,
    borderRadius: 18,
    padding: 16,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },

  welcomeText: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 14,
    textAlign: 'center'
  },

   section: {
    marginTop: 20,
    color: '#9CA3AF',
    fontFamily: 'Pixel',
    fontSize: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  cardWrapper: {
    width: '48%',
    marginBottom: 14,
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 16,
    height: 130,
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },

  cardIcon: {
    width: 34,
    height: 34,
  },

  cardText: {
    color: '#fff',
    fontFamily: 'Pixel',
    fontSize: 11,
  },

  cta: {
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
  },

  ctaIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },

  ctaTitle: {
    fontFamily: 'Pixel',
    fontSize: 14,
    color: '#000'
  },

  ctaText: {
    fontSize: 10,
    color: '#000'
  },

  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: '#020617',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },

  navItem: {
    alignItems: 'center'
  },

  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#64748B'
  },

  navText: {
    fontSize: 10,
    color: '#64748B'
  }
});