import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'


export default function App() {
const [friend, setFriend] = useState([])
const [picture, setPicture] = useState('')
const [name, setName] = useState('')
async function getSavedFriends() {
  const response = await axios.get('/api/friends') 
  setFriend(response.data)
}
useEffect(() => {getSavedFriends()}, [])

const addFriend = () => {
  const friendArray = [...friend]
 friendArray.push({picture: picture, name: name})
 setFriend(friendArray)
 setPicture('')
 setName('')
 console.log(friendArray)
}
const friendInfo = friend.map((person) => {
return (
<div key={person.name}>
  <img src={person.picture}></img>
  <span>{person.name}</span>
</div>
)
}
)
  return <div>
    <label htmlFor='image'>Picture:</label>
    <input id='image' value={picture} onChange={(e) => setPicture(e.target.value)}></input>
    <label htmlFor='name'>Name:</label>
    <input id='name' value={name} onChange={(e) => setName(e.target.value)}></input>
    <button onClick={addFriend}>Add Friend</button>
    {friendInfo}
  </div>;
}
