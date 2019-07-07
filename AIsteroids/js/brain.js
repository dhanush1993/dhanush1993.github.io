'use strict';
class Brain{
	constructor(NEURONS){
		this.neurons = NEURONS
		this.hiddenLayer = tf.layers.dense({
			units: NEURONS,
			inputShape: [12],
			activation: 'sigmoid',
			kernelInitializer: 'leCunNormal',
			useBias: true,
			biasInitializer: 'randomNormal',

		});
		
		this.outputLayer = tf.layers.dense({
			units: 3,
		})
		this.loadModel().then(model => {
			this.model = model;
		});
		

	}
	
	async loadModel(){
		try{
			var model = await tf.loadLayersModel('localstorage://my-model-1');
		}catch{
			var model = tf.sequential()
			model.add(this.hiddenLayer)
			model.add(this.outputLayer)
			model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
		}
		return model
	}

	
	replaceModel(){
		this.model.add(this.hiddenLayer)
		this.model.add(this.outputLayer)
		this.compile()
	}
	
	initializeWeights(){
		this.model.weights.forEach(w => {
			const newVals = tf.randomNormal(w.shape);
			// w.val is an instance of tf.Variable
			w.val.assign(newVals);
		});
	}
	
	compile(){
		this.model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
	}
	
	copyWeights(){
	}
	
	predict(val){
		var prediction =  this.model.predict(val);
	
		//prediction.print();
		return prediction
	}
	
	clone(){
		var brain = new Brain(this.neurons)
		var temp = []
		this.model.weights.forEach(w => {
			temp.push(w);
		});
		brain.model.weights.forEach(w =>{
			var y = temp.shift()
			y.val.data().then(out=>{
				w.val.assign(tf.reshape(out,w.shape))
			})
		})
		return brain
	}
}