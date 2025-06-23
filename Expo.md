# Expo


## React Native setup

- [React Native docs](https://reactnative.dev/docs/environment-setup)

- Expo is framework for react-native
- [Expo Docs](https://docs.expo.dev/)


 ## React Vs React Native

 #### Components

 import {View, Text} from 'react-native'
 div -> View
 h1, p -> Text

 #### Styling

- React
className="card"
.card{
  padding:16px;
  border-radius: 8px
}
- React Native
<Text style={styles.card}>Some Text</Text>
const styles = StyleSheet.create({
  card: {
    padding:16,
    borderRadius: 8
  }
})


#### Event Handling

<button onCick = {handleClick} > Click Me </button> -> <TouchableOpacity onPress = {handlePress}> Press Me </TouchableOpacity>
onMouseOver = {()=>console.log('Mouse over')} -> onLongPress = {()=>console.log('Long Press')} 

#### Lists

const WebList = ({items}) => {
  return (
    <div className="list-container">
      {items.map((item)=>(
        <div key={item.id} className="list-item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>  
  )
}

- we can do same in react native but for performance optimization we use FlatList

<FlatList
  data={items}
  renderItem = {renderItem}
  keyExtraction = {(item)=>item.id}
  onEndReached = {()=> console.log("End Reached")}
  onEndReachedThreshold={0.5}
/>

const renderItem = ({item})=>{
  <View style={styles.listItem}>
    <Text style={styles.itemTitle}>{item.title}</Text>
    <Text>{item.description}</Text>
  </View>
}

#### Forms

const [formData, setFormData] = useState({
  username:"",
  email:""
})

-------React---------------
<form onSubmit={(e)=>e.preventDefault()}>
  <input type="text" value={formData.username} onChange={(e)=>setFormData({...formData, username: e.target.value})} placeholder="Username"/>
  <button type="submit">Submit</button>
</form>

------React Native------------

<View style={styles.form}>
<TextInput style={styles.input} value={formData.username} onChange={(text)=>setFormData({...formData, username:text})} placeholder="Username"/>
<TouchableOpacity onPress={()=> console.log("Submit")}> <Text>Submit</Text> </TouchableOpacity>
</View>
 
## Setup

- npx create-expo-app@latest .
- npm run reset-project
- npx expo

add ES7 react native extension for vscode

## Basics

```js
- <Image source = {{uri: ""}} style ={{width: 100, height:100}} />
- <TextInput placeholder="Your email" secureTextEntry = {false}/>
- <View></View>
- <Text> This is some text </Text>
- <TouchableOpacity><Text>Click Me</Text></TouchableOpacity>
- <Link href = {"/about"}> visit about screen</Link>
- rnfe (react native functional component)

- Stack Navigator
<Stack 
  screenOptions = {{headerShown: false}}  
/>

return (

<SafeAreaView style={{flex:1}}>
  <Stack screenOptions = {{headerShown: false}}  />
<!--   <StatusBar style="dark"/> -->
</SafeAreaView>

)
```
- In web dev flex is in row direction by default while in mobile dev, flex is column direction by default.


## Auth

```js
return (
<ClerkProvider>
 <Slot />
</ClerkProvider>
)

```

## routes
- app - (auth) - sign-in.jsx, _layout.jsx, sign-up.jsx, verify-email.jsx
- app - (tabs) - index.jsx, _layout.jsx
  
