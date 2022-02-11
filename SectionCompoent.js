import React, { Component } from 'react';
import { TouchableOpacity, Animated, ScrollView, StyleSheet, View, Text, TextInput, Dimensions,Button,Alert ,Platform} from 'react-native';
import TimerComponent from './TimerComponent';

const windowWidth = Dimensions.get('window').width;
let count = 0;

export default class SectionCompoent extends Component {

    constructor() {
        super();

        this.state = { valueArray: [], disabled: false,isTimerVisible: false,selectedIndex:0 ,isUpdate:false,title:""}
        this.index = 0;
        this.data = [];
        this.keySet = [];
        this.keyStore = [];
        this.indexStore=[];

        this.animatedValue = new Animated.Value(0);
    }

    addMore = () => {
        this.updateKeyset()
        this.animatedValue.setValue(0);
        let newlyAddedValue = { index: this.index }
        this.setState({ disabled: true, valueArray: [...this.state.valueArray, newlyAddedValue] }, () => {
            Animated.timing(
                this.animatedValue,
                {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                }
            ).start(() => {
                this.index = this.index + 1;
                this.setState({ disabled: false });
            });
        });
    }

    onChangeText1 = (key,title) => {

        let dict = { 'key': "", 'title': "", 'project': "" };

       dict['key'] = key
       dict['title'] = title;
  
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]["key"] == key) {
                let project = this.data[i]["project"]
                dict['project'] = project;

            }

        }
        this.data.splice(key, 1);
        this.data.push(dict)


    }

    onChangeText2 = (key, project) => {
       let dict = { 'key': "", 'title': "", 'project': "" };

        dict['key'] = key
        dict['project'] = project;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i]["key"] == key) {
                let title = this.data[i]["title"]
                dict['title'] = title;

            }

        }
        this.data.splice(key, 1);
        this.data.push(dict)

    }

    onCreate = (key,index) => {
      this.setState({ isTimerVisible: true, selectedIndex: key})

      if(this.state.isUpdate){

        this.setState({ isUpdate: false })

      }
        console.log("......", index);
        this.keySet.push(key)
    }

    onUpdate = (key) =>{
        this.setState({ isUpdate: true })
        for (let i = 0; i < this.keySet.length; i++) {
            if (this.keySet[i] == key) {
                this.keySet.splice(i, 1);

            }
        }
        for (let i = 0; i < this.data.length; i++) {
         //   this.data.splice(key, 1);

        }

    }

    onRemove = (key,indx) => {

       // this.keySet = this.keySet.filter((item) => item != key);
       // this.data.splice(key,1);


        let va = this.state.valueArray;

        for (let i = 0; i < va.length; i++) {
            let index = va[i]["index"];

            if (index == indx){
                if(va.length >1){
                  va.splice(index, 1);
                }
                else{
                    va =[];
                }
            }
        }
        this.setState({ valueArray: va })
        for (let i = 0; i < this.data.length; i++) {
            this.data = this.data.filter((item) => item["key"] != key);

        }


        this.forceUpdate()
        this.keyStore.push(key);
        //this.updateKeyset()
    }
    updateKeyset(){
        for (let i = 0; i < this.keyStore.length; i++) {
            let key = this.keyStore[i]
            this.keySet = this.keySet.filter((item) => item != key);
        }
        //this.keyStore = [];
    }

    renderTimer(){
        return (


            <View 
                style={{
                    height: 120,
                    backgroundColor: 'red',
                    width: windowWidth - 20,
                    marginTop: this.index == 1 ? 20 : this.index * 140

                }}>
                    </View>
         );
    }

    getText(key){


        for (let i = 0; i < this.data.length; i++) {

            if(this.data[i]["key"] == key){
                let title = this.data[i]["title"] 
                let project = this.data[i]["project"] 
                if(title == "" || project == "")
                //this.textStore.push(this.data[i]);
                    //this.data.splice(i, 1);
                    this.data.splice(key, 1);

            }


        }

        for (let i = 0; i < this.data.length; i++) {

            if (this.data[i]["key"] == key) {
                let title = this.data[i]["title"]
                let project = this.data[i]["project"]
                return title + "\n" + project

            }


        }


    }



    

    render() {
        const animationValue = this.animatedValue.interpolate(
            {
                inputRange: [0, 1],
                outputRange: [-59, 0]
            });

        let newArray = this.state.valueArray.map((item, key) => {

                return (

                    
                    <View key={key} 
                        style={{
                            height: Platform.OS == "ios" ? 140 : 220,
                            backgroundColor: 'white',
                            width: windowWidth-20,
                            marginTop:20

                        }}>

                        {!this.keySet.includes(key)&& <View>
                        <Text> Title </Text>
                        <TextInput
                            style={{margin:4}}
                            onChangeText={newText => this.onChangeText1(key, newText)}
                            placeholder="Title"
                        />
                        <Text> Project </Text>
                        <TextInput
                            style={{ margin: 4 }}
                            onChangeText={newText => this.onChangeText2(key,newText)}
                            placeholder="Project"
                        />
                        <View style={{justifyContent:"space-evenly",flexDirection:"row"}}>
                            <Button
                                color="red"
                                title={this.state.isUpdate ? "Update" : "Create"}
                                onPress={() => this.onCreate(key,item["index"])}
                            />
                            <Button
                                color="green"
                                title="Cancel"
                                onPress={() => Alert.alert('Cancel Button pressed')}
                            />

                        </View>

                        </View>}

                        {this.keySet.includes(key)&& <View
                            style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
                           <Text style={{width:40,textAlign:"left"}}>{this.getText(key)}</Text>     

                         <TimerComponent/>

                            <View style={{ justifyContent: "space-around", flexDirection: "row", width: Platform.OS == "ios" ? 54 : 80,alignItems:"baseline",marginTop:68}}>
                            <Button
                                color="red"
                                title="--"
                                onPress={() => this.onRemove(key,item["index"])}
                            />
                            <Button
                                color="green"
                                title="edit"
                                onPress={() => this.onUpdate(key) }
                            />
                         
                         </View>

                        </View>}

                    </View>

                );
            
        });

        return (
            <View style={styles.container} >
                <ScrollView>
                    <View style={{ flex: 1, padding: 4 }}>
                        {
                            newArray
                        }
                    </View>

                <TouchableOpacity activeOpacity={0.8} 
                    style={{
                        //position: 'absolute',
                        marginBottom:20,
                        width: 30,
                        height: 30,
                        backgroundColor: "gray",
                        justifyContent: 'center',
                        alignItems: 'center', 
                        alignSelf:"center",
                        marginTop: this.state.valueArray.length * 40}}

                        disabled={this.state.disabled} onPress={this.addMore}>
                    <Text style={{

                        textAlign:"center"
                        //alignContent:"center"


                    }}> + </Text>
                </TouchableOpacity>
                </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        viewHolder: {
            height: 55,
            backgroundColor: '#ff4081',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 4
        },
        headerText: {
            color: 'white',
            fontSize: 25
        },
        buttonDesign: {
            position: 'absolute',
            width: 30,
            height: 30,
            backgroundColor: "gray",
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonImage: {
            resizeMode: 'contain',
            width: '100%',
        }
    });