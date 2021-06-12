import {makeAutoObservable} from "mobx";

export default class Queries {
    constructor() {
        this._algs = []
        this._tables = []
        this._selectedTable = {}
        this._selectedAlg = {}
        this._group = {}
        this._fam = {}
        this._nom = {}
        this._desc = {}
        this._type = {}
        this._goal = {}
        this._query = {}
        this._querySQL = {}
        this._resultQuery = []
        this._namesCol = []
        this._nameTablesMarks = []
        this._fis = {}
        this._selectedFis = []
        this._namTabs = []
        this._marks = []


        this._tuples = []
        this._selectedTup = {}
        this._checkTable = {}
        makeAutoObservable(this)
    }

    setAlgs(algs) {
        this._algs = algs
    }

    setTuples(tuples) {
        this._tuples = tuples
    }

    setTables(tables) {
        this._tables = tables
    }
    setSelectedTable(table){
        this._selectedTable = table
    }

    setSelectedAlg(alg){
        this._selectedAlg = alg
    }

    setSelectedTup(tuple){
        this._selectedTup = tuple
    }

    setGroup(group) {
        this._group = group
    }
    setFam(fam) {
        this._fam = fam
    }
    setNom(nom) {
        this._nom = nom
    }
    setDesc(desc) {
        this._desc = desc
    }
    setType(type) {
        this._type = type
    }
    setGoal(goal) {
        this._goal = goal
    }
    setQuery(query) {
        this._query = query
    }
    setQuerySQL(querySQL) {
        this._querySQL = querySQL
    }
    setResultQuery(resultQuery) {
        this._resultQuery = resultQuery
    }
    setNamesCol(namesCol) {
        this._namesCol = namesCol
    }
    setNameTablesMarks(nameTablesMarks) {
        this._nameTablesMarks = nameTablesMarks
    }

    setFis(fis) {
        this._fis = fis
    }

    setNamTabs(namTabs) {
        this._namTabs = namTabs
    }

    setMarks(marks) {
        this._marks = marks
    }

    setCheckTable(ch) {
        this._checkTable = ch
    }


    get algs() {
        return this._algs
    }

    get tuples() {
        return this._tuples
    }

    get selectedAlg(){
        return this._selectedAlg
    }

    get selectedTup(){
        return this._selectedTup
    }

    get tables() {
        return this._tables
    }
    get selectedTable(){
        return this._selectedTable
    }


    get group(){
        return this._group
    }
    get fam(){
        return this._fam
    }
    get nom(){
        return this._nom
    }
    get desc(){
        return this._desc
    }
    get type(){
        return this._type
    }
    get goal(){
        return this._goal
    }
    get query(){
        return this._query
    }
    get querySQL(){
        return this._querySQL
    }
    get resultQuery(){
        return this._resultQuery
    }
    get namesCol(){
        return this._namesCol
    }
    get nameTablesMarks(){
        return this._nameTablesMarks
    }
    get fis(){
        return this._fis
    }
    get selectedFis(){
        return this._selectedFis
    }
    get namTabs(){
        return this._namTabs
    }
    get marks(){
        return this._marks
    }
    get checkTable(){
        return this._checkTable
    }

}
