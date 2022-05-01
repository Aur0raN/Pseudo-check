import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import search from '../../assets/search.png';
import { Text, TextInput, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogoImage from '../../assets/Logo.jpg';

export default AccountSearch = () => {
    const [twitterUserDetails, SetTwitterUserDetails] = useState({
        "Created At": "06/02/2009",
        "Followers Count": 83027770,
        "Following Count": 114,
        "ID": 44196397,
        "Private": false,
        "Profile Image URL": "https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_normal.jpg",
        "Tweet Count": 17505,
        "name": "Elon Musk",
        "username": "elonmusk",
        "Originality Percentage": 72.0,
        "Spam Percentage": 28.0    
    });

    return (
        <Provider>
            <ScrollView contentContainerStyle={{flexGrow: 1}}> 
            <SafeAreaView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Image style={styles.logoImage} source={LogoImage} />
                    <Text style={styles.title}>Pseudo Check</Text>
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.searchFieldsContainer}>
                        <View>
                            <TextInput 
                                mode='outlined' 
                                selectionColor='#0000b2' 
                                activeOutlineColor='#508cb2' 
                                style={styles.seachInputText} label="UserName" 
                                onChangeText={(val) => SetTwitterUserDetails({ username: val }) }
                            />
                        </View>
                        <TouchableOpacity onPress={() => { Search(twitterUserDetails.username) }}>
                            <Image source={search} style={styles.searchImage}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.systemAccountText}>Account Details</Text>
                    <Image
                        style={styles.profilePicture}
                        source={{uri:twitterUserDetails['Profile Image URL']}}
                    />
                    <View style={styles.userDetail}>
                        <Text style={styles.systemTexts}>Name :</Text>
                        <Text style={styles.accountText}>{twitterUserDetails.name}</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={styles.systemTexts}>User Name :</Text>
                        <Text style={styles.accountText}>@{twitterUserDetails.username}</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={styles.systemTexts}>Tweet Count :</Text>
                        <Text style={styles.accountText}>{twitterUserDetails['Tweet Count']}</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={styles.systemTexts}>Number of followers :</Text>
                        <Text style={styles.accountText}>{twitterUserDetails['Followers Count']}</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={styles.systemTexts}>Number of following :</Text>
                        <Text style={styles.accountText}>{ twitterUserDetails['Following Count']  }</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={styles.systemTexts}>Created at :</Text>
                        <Text style={styles.accountText}>{twitterUserDetails['Created At']}</Text>
                    </View>
                </View>
                <View style={styles.resultsContainer}>
                <Button title="Analyse" color="#62bffa" onPress={() => {Analyse}}/>
                    <Text style={styles.resultText}>Results </Text>
                    <View style={styles.userDetail}>
                        <Text style={{ color: '#b2d8b2' }}>Originality Percentage :</Text>
                        <Text style={{ color: '#4ca64c' }}>{twitterUserDetails['Originality Percentage']} %</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={{ color: '#ffb2b2' }}>Spam Percentage :</Text>
                        <Text style={{ color: '#ff4c4c' }}>{twitterUserDetails['Spam Percentage']} %</Text>
                    </View>
                </View>
            </SafeAreaView>
            </ScrollView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center'
    },
    searchContainer: {
        alignContent:'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        flex: 1
    },
    seachInputText: {
        height: 40,
        color: '#E59866',
        textAlignVertical: 'top',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 300
    },
    inputText: {
        color: '#E59866',
        textAlignVertical: 'top',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 300
    },
    searchContainer: {
        alignItems: "center",
        borderRadius: 16,
        width: 370,
        height: 80,
        borderColor: '#b4cede',
        shadowColor: "#b4cede",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4
    },
    searchFieldsContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        width: 360,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    userDetails: {
        flex: 2,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#b4cede',
        width: 350
    },
    userDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1.5,
    },
    resultsContainer: {
        flex: 1,
        marginTop: 10,
        alignContent:'space-around',
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    profilePicture: {
        width: '25%', 
        height: '25%', 
        borderRadius:10, 
        alignSelf: 'center'
    },
    logoImage:{
        borderRadius:100,
        alignSelf: 'center',
        resizeMode: 'stretch',
        width: 70,
        height: 70
    },
    searchImage:{
        marginLeft: 5, 
        width: 25, 
        height: 25, 
        tintColor: 'lightblue'
    }, 
    title:{
        color: '#034066',
        fontSize: 23,
        marginTop: 20
    },
    systemAccountText:{
        color: '#034066',
        marginHorizontal: 100,
        marginVertical: 20,
        fontSize: 20
    },
    resultText:{
        color: '#034066', 
        marginHorizontal: 120, 
        marginVertical: 20, 
        fontSize: 20
    },
    systemTexts:{
        color: '#b4cede'
    },
    accountText:{
        color: '#055c92'
    },
})