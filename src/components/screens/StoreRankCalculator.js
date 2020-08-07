import React, { Fragment, useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TextInput, Divider, IconButton } from 'react-native-paper';
//import TextInputMask from 'react-native-text-input-mask';
import { TextInputMask } from 'react-native-masked-text'
import AreaButton from '../util/AreaButton';
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
//import console = require('console');
function StoreRankCalculator({ navigation }) {
    const [soldPercent, setSoldPercent] = useState({ focussed: false, value: '' });
    const [averageSale, setAverageSale] = useState({ focussed: false, value: '' });
    const [upsells, setUpsells] = useState({ focussed: false, value: '' });
    const [upsellGoal, setUpsellGoal] = useState({ focussed: false, value: '' });
    const [finalScore, setFinalScore] = useState(0);
    const [textColor, setTextColor] = useState('#01718f')
    const currencyFormat0 = (amount) => {
        var textVar = amount.replace(/[^0-9,]/g, '');
        //   console.log(event.target.value);
        if (textVar !== '' && textVar !== undefined) {
            if (textVar.length > 9) {
                textVar = textVar.slice(0, 9)
            }
            var num = textVar.replace(/(\s)/g, '');
            let num2 = num.replace(',', '');
            // console.log(num2);
            let n = num2.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
            // console.log(n);
            let n2 = n.split(' ')
            if (n2[1] === undefined) {
                textVar = n2[0]
            }
            else if (n2[2] === undefined) {
                let stringVar = n2[0] + ',' + n2[1];
                textVar = stringVar;
            }
            else {
                let stringVar = n2[0] + ',' + n2[1] + ',' + n2[2];
                textVar = stringVar;
            }
        }
        else { textVar = '' }
        return textVar;
    }
    useEffect(() => {
        let averageSaleVar = parseInt(averageSale.value.replace(',', ''));
        let upsellGoalVar = parseInt(upsellGoal.value.replace(',', ''));
        let upsellsVar = parseInt(upsells.value.replace(',', ''));
      //  console.log(averageSaleVar, upsellGoalVar, upsellsVar)
        let sold_percent_score = 0; let avg_sale_score = 0; let upsell_score = 0;
        if (soldPercent.value <= 70) { sold_percent_score = 0.8 * soldPercent.value }
        else if (soldPercent.value > 70 && soldPercent.value <= 75) { sold_percent_score = 0.85 * soldPercent.value }
        else if (soldPercent.value > 75 && soldPercent.value <= 80) { sold_percent_score = 0.87 * soldPercent.value }
        else if (soldPercent.value > 80 && soldPercent.value < 90) { sold_percent_score = 0.898 * soldPercent.value }
        else if (soldPercent.value >= 90) { sold_percent_score = 80; }

        if (averageSaleVar < 3000) { avg_sale_score = 0 }
        else if (averageSaleVar >= 3000 && averageSaleVar < 3050) { avg_sale_score = 1 }
        else if (averageSaleVar >= 3050 && averageSaleVar < 3100) { avg_sale_score = 2 }
        else if (averageSaleVar >= 3100 && averageSaleVar < 3150) { avg_sale_score = 3 }
        else if (averageSaleVar >= 3150 && averageSaleVar < 3225) { avg_sale_score = 4 }
        else if (averageSaleVar >= 3225 && averageSaleVar < 3300) { avg_sale_score = 5 }
        else if (averageSaleVar >= 3300 && averageSaleVar < 3375) { avg_sale_score = 6 }
        else if (averageSaleVar >= 3375 && averageSaleVar < 3450) { avg_sale_score = 7 }
        else if (averageSaleVar >= 3450 && averageSaleVar < 3525) { avg_sale_score = 8 }
        else if (averageSaleVar >= 3525 && averageSaleVar < 3600) { avg_sale_score = 9 }
        else if (averageSaleVar >= 3600) { avg_sale_score = 10 }

        upsell_score = (upsellsVar / upsellGoalVar) * 10;
        if (upsell_score > 10) { upsell_score = 10 }
        else { }
      //  console.log(sold_percent_score, avg_sale_score, upsell_score);
        let finalScoreVar = Math.round(sold_percent_score + avg_sale_score + upsell_score);
        let textColorVar = '';
        if (finalScoreVar < 70 && finalScoreVar !== 0) { textColorVar = 'red' }
        else if (finalScoreVar >= 70 && finalScore <= 85) { textColorVar = '#01718f' }
        else if (finalScoreVar > 85 && finalScore <= 100) { textColorVar = 'green' }
        else { textColorVar = '#01718f' }
        //  console.log(textColorVar);
        if (soldPercent.value > 0 && averageSaleVar > 0 && upsellsVar > 0 && upsellGoalVar > 0) { setFinalScore(finalScoreVar); setTextColor(textColorVar) }
        else setFinalScore(0)
    }, [soldPercent, averageSale, upsells, upsellGoal])
    const createExitAlert = () => Alert.alert(
        "Are you sure??",
        "You are about to exit!",
        [
            {
                text: "Cancel",
                style: "cancel"
            },
            { text: "OK", onPress: () => navigation.navigate('Home') }
        ],
        { cancelable: false }
    );
    const reset = () => {
        setAverageSale({ focussed: false, value: '' }); setSoldPercent({ focussed: false, value: '' }); setUpsells({ focussed: false, value: '' }); setUpsellGoal({ focussed: false, value: '' }); setFinalScore(0);
    }
    return (
        <Fragment>
            <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <View style={{ width: '15%', marginTop: 9 }}>
                    <IconButton icon='home' onPress={createExitAlert} size={30} color='#01718f' style={{ marginLeft: '5%' }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', marginTop: 25, width: '70%' }}>
                    <Text style={{ fontSize: 23, color: '#01718f' }}>Store Rank Calculator</Text>
                </View>
                <View style={{ width: '15%' }}></View>
            </View>
            <Divider />
            <ScrollView style={{ marginTop: 5 }} contentContainerStyle={{ alignItems: 'center' }}>

                <Divider />
                <View style={{ width: '60%', marginTop: 25, flexDirection: 'row' }}>
                    <View style={{ width: '15%' }}></View>
                    <View style={{ width: '70%' }}><TextInput baseColor="black" keyboardType='numeric' label="Sold Percentage" theme={{ colors: { primary: '#01718f' } }}
                        onFocus={() => { setSoldPercent({ ...soldPercent, focussed: true }) }}
                        onBlur={() => { setSoldPercent({ ...soldPercent, focussed: false }) }}
                        onChangeText={(text) => { setSoldPercent({ ...soldPercent, value: text }) }}
                        value={currencyFormat0(soldPercent.value)} maxLength={3}/></View>
                    <View style={{ width: '15%', marginTop: 15, alignItems: 'center' }}>
                        {(soldPercent.focussed || soldPercent.value !== '') ? <Text style={{ fontSize: 30, color: '#01718f' }}>%</Text> : null}</View></View>

                <View style={{ width: '60%', marginTop: 25, flexDirection: 'row' }}>
                    <View style={{ width: '15%', marginTop: 15, alignItems: 'center' }}>
                        {(averageSale.focussed || averageSale.value !== '') ? <Text style={{ fontSize: 30, color: '#01718f' }}>$</Text> : null}</View>
                    <View style={{ width: '70%' }}><TextInput baseColor="black" keyboardType='number-pad' label="Average Sale" theme={{ colors: { primary: '#01718f' } }}
                        onFocus={() => { setAverageSale({ ...averageSale, focussed: true }) }}
                        onBlur={() => { setAverageSale({ ...averageSale, focussed: false }) }}
                        onChangeText={(text) => { setAverageSale({ ...averageSale, value: text }) }}
                        value={currencyFormat0(averageSale.value)} /><View style={{ width: '15%' }}></View></View>
                </View>

                <View style={{ width: '60%', marginTop: 25, flexDirection: 'row' }}>
                    <View style={{ width: '15%', marginTop: 15, alignItems: 'center' }}>
                        {(upsells.focussed || upsells.value !== '') ? <Text style={{ fontSize: 30, color: '#01718f' }}>$</Text> : null}</View>
                    <View style={{ width: '70%' }}><TextInput baseColor="black" keyboardType='number-pad' label="Your Upsells" theme={{ colors: { primary: '#01718f' } }}
                        onFocus={() => { setUpsells({ ...upsells, focussed: true }) }}
                        onBlur={() => { setUpsells({ ...upsells, focussed: false }) }}
                        onChangeText={(text) => { setUpsells({ ...upsells, value: text }) }}
                        value={currencyFormat0(upsells.value)} /><View style={{ width: '15%' }}></View></View>
                </View>

                <View style={{ width: '60%', marginTop: 25, flexDirection: 'row' }}>
                    <View style={{ width: '15%', marginTop: 15, alignItems: 'center' }}>
                        {(upsellGoal.focussed || upsellGoal.value !== '') ? <Text style={{ fontSize: 30, color: '#01718f' }}>$</Text> : null}</View>
                    <View style={{ width: '70%' }}><TextInput baseColor="black" keyboardType='number-pad' label="Upsell Goal" theme={{ colors: { primary: '#01718f' } }}
                        onFocus={() => { setUpsellGoal({ ...upsellGoal, focussed: true }) }}
                        onBlur={() => { setUpsellGoal({ ...upsellGoal, focussed: false }) }}
                        onChangeText={(text) => { setUpsellGoal({ ...averageSale, value: text }) }}
                        value={currencyFormat0(upsellGoal.value)} /><View style={{ width: '15%' }}></View></View>
                </View>
                <View style={{ width: '80%', marginTop: 25, flexDirection: 'row', justifyContent: 'center' }}><Text style={{ fontSize: 35, color: textColor }}>Your Score</Text><Text style={{ lineHeight: 17, fontSize: 17, color: textColor }}>4</Text><Text style={{ color: textColor, fontSize: 45 }}>&nbsp;=&nbsp;{finalScore} </Text></View>

                <View style={{ width: '95%', marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}><Text style={{ lineHeight: 10, fontSize: 10, color: '#01718f' }}>1</Text><Text style={{ fontSize: 15, color: '#01718f', fontStyle: 'italic' }}>80 Pts are awarded for Sold Percentage over 90%</Text></View>
                <View style={{ width: '90%', marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}><Text style={{ lineHeight: 10, fontSize: 10, color: '#01718f' }}>2</Text><Text style={{ fontSize: 15, color: '#01718f', fontStyle: 'italic' }}>10 Pts are awarded for Average Sale over $3400</Text></View>
                <View style={{ width: '90%', marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}><Text style={{ lineHeight: 10, fontSize: 10, color: '#01718f' }}>3</Text><Text style={{ fontSize: 15, color: '#01718f', fontStyle: 'italic' }}>10 Pts are awarded for hitting your upsell goal</Text></View>
                <View style={{ width: '80%', marginTop: 15, flexDirection: 'row', justifyContent: 'center' }}><Text style={{ lineHeight: 10, fontSize: 10, color: '#01718f' }}>4</Text><Text style={{ fontSize: 15, color: '#01718f', fontStyle: 'italic' }}>100 is the maximum score</Text></View>

                <View style={{ marginTop: 25 }}><AreaButton title='Reset' onPress={reset} /></View>
            </ScrollView>
        </Fragment>
    )
}

export default StoreRankCalculator
