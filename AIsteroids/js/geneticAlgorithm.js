'use strict';
class GeneticAlgo{
	
	constructor(pop){
		this.population = pop
	}
	
	allPlayersDead(pop){
		for(var i=0;i<pop.length;i++){
			if(pop[i].player.isAlive){
				return false
			}
		}
		return true
		
	}
	
	selection(players){
		var winner0 = players[0]
		var winner1 = players[1]
		var winner2 = players[2]
		var winner3 = players[3]
		for(var i=0;i<players.length;i++){
			if(winner0.score<players[i].score){
				winner0 = players[i]
			}else if(winner1.score<players[i].score){
				winner1 = players[i]
			}else if(winner2.score<players[i].score){
				winner2 = players[i]
			}else if(winner3.score<players[i].score){
				winner3 = players[i]
			}
		}
		
		var winners = []
		console.log("Generation Score: "+winner0.score)
		winners.push(winner0.brain.clone())
		winners.push(winner1.brain.clone())
		winners.push(winner2.brain.clone())
		winners.push(winner3.brain.clone())
		return winners
	}
	
	evolvePopulation(pop) {
		var players = []
		for(var i=0;i<pop.length;i++){
			players.push(pop[i].player)
		}
		const Winners = this.selection(players);
		var crossover1 = new Brain(players[0].brain.neurons)
		crossover1.model = this.crossOver(Winners[0], Winners[1]);
		const crossover2 = new Brain(players[0].brain.neurons)
		crossover2.model = this.crossOver(Winners[2], Winners[3]);
		const mutatedWinners = this.mutateBias(Winners);
		var mutatedPop = [crossover1, ...Winners, crossover2, ...mutatedWinners];
		for(var i=0;i<players.length;i++){
			players[i].brain = mutatedPop[i]
			players[i].brain.compile()
		}
		
	}
	
	crossOver(a, b) {
		const biasA = a.model.layers[0].bias.read();
		const biasB = b.model.layers[0].bias.read();
	 
		return this.setBias(a, this.exchangeBias(biasA, biasB));
	}
	
	exchangeBias(tensorA, tensorB) {
		const size = Math.ceil(tensorA.size / 2);
		return tf.tidy(() => {
			const a = tensorA.slice([0], [size]);
			const b = tensorB.slice([size], [size]);
	 
			return a.concat(b);
		});
	}
	
	setBias(brain, bias) {
		var newModel = brain.clone().model;
		newModel.layers[0].bias.write(bias);
	 
		return newModel;
	}
	
	
	mutateBias(population) {
	var MutatedPop = []
    for(var i=0;i<population.length;i++){
        var brain = population[i].clone()
		brain.model.weights.forEach(w => {
			w.val.data().then(output => { 
			w.val.assign(tf.sub(tf.reshape(output,w.shape),tf.mul(0.001,tf.randomNormal(w.shape))))
			})
		});
		
		MutatedPop.push(brain)
	}
	return MutatedPop
}




}