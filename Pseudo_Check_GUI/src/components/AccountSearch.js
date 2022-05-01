import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, Alert, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import search from '../../assets/search.png';
import { Text, TextInput, Provider } from 'react-native-paper';
import LogoImage from '../../assets/Logo.jpg';
import axios from 'axios'
import LinearGradient from 'react-native-linear-gradient';

export default AccountSearch = () => {
    const [twitterUserDetails, SetTwitterUserDetails] = useState({
        "Created At": "",
        "Followers Count": 0,
        "Following Count": 0,
        "ID": 0,
        "Private": false,
        "Profile Image URL": "",
        "Tweet Count": 0,
        "name": "",
        "username": "",
    });

    const [userReportDetails, SetUserReportDetails] = useState({
        "Originality Percentage": 0,
        "Spam Percentage": 0    
    });

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    const [isAnalyse, setIsAnalyse] = useState(false);

    //Search for a user
    const Search = async (username) => {
        if (username == null) {
            Alert.alert('Please enter a account name');
        }
        else {
            var URL = "https://pseudo-check.herokuapp.com/username/" + username;
            console.log(URL);
            await axios.get(URL).then(function (response) {
                setIsUserDataLoaded(true);
                setIsAnalyse(false);
                SetTwitterUserDetails(response.data);
                console.log(response.data);
            }).catch(function (error) {
                Alert.alert('No Account Found');
                console.log(error);
            })    
        }
    };

    //Get the user analysis report
    const Analyse = () => {
        if (twitterUserDetails.username.length == 0) {
            Alert.alert('No User found!, To get analysis, search a Twitter user.', [{ text: 'Okay' }]);
        } else{
            const checkuser = async () => {
                const URL = "https://pseudo-check.herokuapp.com/checkuser/" + twitterUserDetails.username;
                console.log(URL);
                await axios.get(URL).then(function (response) {
                    setIsAnalyse(true);
                    SetUserReportDetails(response.data);
                    console.log(response.data);
                }).catch(function (error) {
                    Alert.alert('No Account Found');
                    console.log(error);
                })    
            };
            checkuser();
        }
    }

    // Inisial the page and set user name
    const Inisial = (name) => {
        SetTwitterUserDetails({ username: name });
        setIsUserDataLoaded(false);
        setIsAnalyse(false);
    }
        
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
                                onChangeText={(val) => Inisial(val) }
                            />
                        </View>
                        <TouchableOpacity onPress={() => {Search(twitterUserDetails.username)}}>
                            <Image source={search} style={styles.searchImage}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                {isUserDataLoaded == true ? 
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
                        {/* <Button title="Analyse" color="#62bffa" onPress={() => {Analyse()}}/> */}
                        <View style={styles.headerContainer}>
                            <TouchableOpacity onPress={() => { Analyse() }} >
                                <LinearGradient colors={['#055C92', '#01ab9d']} style={styles.button}>
                                    <Text style={styles.buttonText}>Analyse</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                : 
                    <View style={styles.introductionContainer}>
                        <Text style={styles.introductionText} >Pseudo-check is an application developed to analyze and show the twitter user a report of the user account's details and how genuine they are.</Text>
                    </View>
                }
                {isAnalyse == true ? 
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultText}>Results </Text>
                    <View style={styles.userDetail}>
                        <Text style={{ color: '#b2d8b2' }}>Originality Percentage :</Text>
                        <Text style={{ color: '#4ca64c' }}>{userReportDetails['Originality Percentage']} %</Text>
                    </View>
                    <View style={styles.userDetail}>
                        <Text style={{ color: '#ffb2b2' }}>Spam Percentage :</Text>
                        <Text style={{ color: '#ff4c4c' }}>{userReportDetails['Spam Percentage']} %</Text>
                    </View>
                </View>
                : null}
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
    button: {
        alignItems: 'center',
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    introductionContainer: {
        flex: 2,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#b4cede',
        width: 350
    },
    introductionText: {
        color: '#034066',
        marginHorizontal: 30,
        marginVertical: 50,
        fontSize: 20
    }
})