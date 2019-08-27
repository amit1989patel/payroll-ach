module.exports = {
    ITEMB1:{
        name: 'B',
		width: 1,
		position: 1,
		required: true,
		type: 'alphanumeric',
		value: 'B'
    } ,
    ITEMB2: {
        name: 'A',
		width: 1,
		position: 2,
		required: true,
		type: 'alphanumeric',
		value: 'A'
    },
    ITEMB3: {
        name: 'Client ID',
		width: 20,
		position: 3,
		required: true,
		type: 'alphanumeric',
		value: ''
    },
    ITEMB4: {
        name: 'Bank ABA Number',
		width: 9,
		position: 4,
		required: true,
		type: 'numeric',
		value: ''
    },
    ITEMB5: {
        name: 'Bank Account Number',
		width: 17,
		position: 5,
		required: true,
		type: 'numeric',
		value: ''
    },
    ITEMB6: {
        name: 'Account Holder Name',
		width: 50,
		position: 6,
		required: true,
		type: 'alphanumeric',
		value: ''
    },
    ITEMB7: {
        name: 'the primary Bank Account enter',   //default to 1
		width: 2,
		position: 7,
		required: true,
		type: 'numeric',
		value: '1'
    }
};