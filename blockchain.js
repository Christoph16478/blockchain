var SHA256 = require("crypto-js/sha256") // holen funktionalität sha256

// variable named blockchain as an empty array, this will contain the blockchain
// no specific datatype (object)
var blockchain = [] 

function addBlock(newData)
{ 
	// previous block? 
	if (blockchain.length == 0) // if null, array is empty
	{ 
		// empty chain - initialize 
		var block = { 
		data: newData, 
		hashPrevious: 0 
	} 
	blockchain.push(block) 
	} 
	else
	{ 
		// there is something in the blockchain 
		var alterBlock = blockchain[ blockchain.length - 1 ] 
		var textAlterBlock = JSON.stringify(alterBlock) 
		var block =
		{ 
		data: newData, 
		hashPrevious: SHA256(textAlterBlock).toString() 
		} 
		blockchain.push(block) // push addes element at the end of the array
	} 
}

function checkBlock(index)
{ 
	// check block for consistency, get array from block and see if the
	// Block auf Konsistenz prüfen. Holt Array aus Block heraus und schaut ob der
	// Hash auf das der hash mit dem des zweiten Blcokes Konsistent ist
	// Block rausholen 
	var myBlock = blockchain[index] 
	// sind wir beim ersten Block? 
	if (index == 0)
	{ 
		if (myBlock.hashPrevious == 0) { 
		return true 
		} 
		else
		{ 
			console.log("Block 0 hat falschen Vorgaenger-Hash") 
			return false 
		} 
	} 
	else
	{ 
		// get previous block 
		var vorgaenger = blockchain[index-1] 
		// Hash?
		// step 1 - convert into text 
		var textVorgaenger = JSON.stringify(vorgaenger) 
		// step 2 - calculate SHA256 
		var hashVorgaenger = SHA256(textVorgaenger).toString() 
		// compare 
		if (myBlock.hashPrevious == previousHash)
		{ 
			return true 
		} 
		else
		{ 
			console.log("Block " + index + " wrong previous-hash block") 
			return false 
		} 
	} 
}

function checkBlockchain()
{ 
	var i; 
	for (i=0; i<blockchain.length; i++)
	{ 
		checkBlock(i) 
	} 
} 

addBlock("First block") 
addBlock("Second block") 
addBlock("Thrid block") 

blockchain[1].data = "faked" 
checkBlockchain() 

console.log(blockchain) 
