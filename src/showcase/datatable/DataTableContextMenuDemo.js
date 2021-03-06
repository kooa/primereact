import React, { Component } from 'react';
import {DataTable} from '../../components/datatable/DataTable';
import {Column} from '../../components/column/Column';
import {ContextMenu} from '../../components/contextmenu/ContextMenu';
import {Growl} from '../../components/growl/Growl';
import {CarService} from '../service/CarService';
import {DataTableSubmenu} from '../../showcase/datatable/DataTableSubmenu';
import {TabView,TabPanel} from '../../components/tabview/TabView';
import {CodeHighlight} from '../codehighlight/CodeHighlight';

export class DataTableContextMenuDemo extends Component {

    constructor() {
        super();
        this.state = {};
        this.carservice = new CarService();
        this.viewCar = this.viewCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    viewCar(car) {
        this.setState({
            messages: [
                {severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand}
            ]
        });
    }

    deleteCar(car) {
        let carsList = [...this.state.cars];
        carsList = carsList.filter((c) => c.vin !== car.vin);

        this.setState({
            cars: carsList,
            messages: [
                {severity: 'info', summary: 'Car Delete', detail: car.vin + ' - ' + car.brand}
            ]
        });
    }

    render() {
        let items = [
            {label: 'View', icon: 'fa-search', command: (event) => this.viewCar(this.state.selectedCar)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteCar(this.state.selectedCar)}
        ];

        return (
            <div>
                <DataTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataTable - ContextMenu</h1>
                        <p>DataTable has exclusive integration with ContextMenu.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Growl value={this.state.messages}></Growl>

                    <ContextMenu model={items} ref={el => this.cm = el}/>

                    <DataTable value={this.state.cars} contextMenu={this.cm} selectionMode="single" header="Right Click"
                        selection={this.state.selectedCar} onSelectionChange={(e) => this.setState({selectedCar: e.data})}>
                        <Column field="vin" header="Vin" />
                        <Column field="year" header="Year" />
                        <Column field="brand" header="Brand" />
                        <Column field="color" header="Color" />
                    </DataTable>
                </div>

                <DataTableContextMenuDemoDoc></DataTableContextMenuDemoDoc>
            </div>
        );
    }
}

export class DataTableContextMenuDemoDoc extends Component {
    
    render() {
        return (
            <div className="content-section source">
                <TabView>
                    <TabPanel header="Source">
<CodeHighlight className="javascript">
{`
import React, { Component } from 'react';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {ContextMenu} from 'primereact/components/contextmenu/ContextMenu';
import {Growl} from 'primereact/components/growl/Growl';
import {CarService} from '../service/CarService';

export class DataTableContextMenuDemo extends Component {

    constructor() {
        super();
        this.state = {};
        this.carservice = new CarService();
        this.viewCar = this.viewCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => this.setState({cars: data}));
    }

    viewCar(car) {
        this.setState({
            messages: [
                {severity: 'info', summary: 'Car Selected', detail: car.vin + ' - ' + car.brand}
            ]
        });
    }

    deleteCar(car) {
        let carsList = [...this.state.cars];
        carsList = carsList.filter((c) => c.vin !== car.vin);

        this.setState({
            cars: carsList,
            messages: [
                {severity: 'info', summary: 'Car Delete', detail: car.vin + ' - ' + car.brand}
            ]
        });
    }

    render() {
        let items = [
            {label: 'View', icon: 'fa-search', command: (event) => this.viewCar(this.state.selectedCar)},
            {label: 'Delete', icon: 'fa-close', command: (event) => this.deleteCar(this.state.selectedCar)}
        ];

        return (
            <div>
                <DataTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>DataTable - ContextMenu</h1>
                        <p>DataTable has exclusive integration with ContextMenu.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Growl value={this.state.messages}></Growl>

                    <ContextMenu model={items} ref={el => this.cm = el}/>

                    <DataTable value={this.state.cars} contextMenu={this.cm} selectionMode="single" header="Right Click"
                        selection={this.state.selectedCar} onSelectionChange={(e) => this.setState({selectedCar: e.data})}>
                        <Column field="vin" header="Vin" />
                        <Column field="year" header="Year" />
                        <Column field="brand" header="Brand" />
                        <Column field="color" header="Color" />
                    </DataTable>
                </div>
            </div>
        );
    }
}

`}
</CodeHighlight>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}
