import React from 'react';
import merge from 'lodash/merge';

class FilterView extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.infiniteScroll = this.infiniteScroll.bind(this);
        this.whiteSlider = this.whiteSlider.bind(this);
        this.blueSlider = this.blueSlider.bind(this);
        this.state = {
            endIdx: 13
        };
    }

    componentDidMount() {
        this.props.changeFilterView({ view: "all", loading: false });
        this.props.requestProducts(
            {
                products: {
                    endIdx: 13
                }
            }
        );

        window.addEventListener('scroll', this.infiniteScroll);
    };

    whiteSlider (slider) {
        slider.style.backgroundColor = "white";
    };

    blueSlider (slider) {
        slider.style.backgroundColor = "rgb(47,183,236)"
    };
    
    infiniteScroll(e) {

        if (document.scrollingElement.scrollHeight
            - document.scrollingElement.scrollTop
            - document.scrollingElement.clientHeight < 15 &&
            !this.props.filterView.loading) {
                
            window.removeEventListener('scroll', this.infiniteScroll);
            
            let load = merge({}, this.props.filterView);
            load.loading = true;
            this.props.changeFilterView(load);

            this.setState((prevState) => {
                return {
                    endIdx: prevState.endIdx + 13
                };
            }, () => {
                setTimeout(() => {
                    let data;
                    switch (this.props.filterView.view) {
                        case "all":
                            data = {
                                products: { endIdx: this.state.endIdx }
                            };
                            break;
                        case "dog":
                            data = {
                                search: { tag: "dog", endIdx: this.state.endIdx }
                            };
                            break;

                        case "bbq":
                            data = {
                                search: { tag: "bbq", endIdx: this.state.endIdx }
                            };
                            break;
                    };

                    this.props.requestProducts(
                        data)
                        .then(() => {
                            this.setState(prevState => {
                                return {
                                    endIdx: prevState.endIdx
                                };
                            })
                        }, () => {
                            let load = merge({}, this.props.filterView);
                            load.loading = false;
                            this.props.changeFilterView(load);
                            window.addEventListener('scroll', this.infiniteScroll);
                        })
                        .then(() => {
                            let load = merge({}, this.props.filterView);
                            load.loading = false;
                            this.props.changeFilterView(load);
                            window.addEventListener('scroll', this.infiniteScroll);
                        })
                }, 300);
            });
        };
    };

    handleClick(e,tag) {
        // e.preventDefault();

        if (tag === "all" && this.props.filterView.view !== "all") {
            this.props.changeFilterView({view: "all", loading: false});
            this.props.requestProducts(
                {
                    products: {
                        endIdx: 13
                    }
                }
            ).then(() => {
                this.setState(prevState => {
                    return {
                        endIdx: 13
                    };
                });
            });

        } else if (tag ==="dog" && this.props.filterView.view !== "dog" ||
                    tag ==="bbq" && this.props.filterView.view !== "bbq") {
            
            this.props.changeFilterView({view: tag, loading: false});

            this.props.requestProducts(
                { search: {
                    tag,
                    endIdx: 13
                    }
                }
            ).then(() => {
                this.setState(prevState => {
                    return {
                        endIdx: 13,
                    };
                });
            });
        } else if (tag==="recentlyviewed") {
            this.props.changeFilterView({view: tag, loading: false});

            this.props.requestProducts(
                { search: {
                    tag,
                    history: this.props.viewedProducts
                    }
                }
            ).then(() => {
                this.setState(prevState => {
                    return {
                        endIdx: 13,
                    };
                });
            });
        }
    }


    render() {
        let blankStyle = {
            height: "5px",
            width: "150px",
            bottom: "-7px",
            position: "relative"
        }

        let selectedStyle = {
            height: "5px",
            width: "150px",
            bottom: "-7px",
            position: "relative",
            backgroundColor: "rgb(47,183,236)"
        }

        // confused why this doesn't work.
        // let that = this;

        // window.addEventListener('DOMContentLoaded', (e) => {
        //     let filterView = document.getElementsByClassName("FilterView");
        //     let slider = document.getElementsByClassName("slider");
        // 
        //     for (let i = 0; i < filterView.length; i++) {
        //         filterView[i].addEventListener("mouseover", () => { this.blueSlider(slider[i]) });
        //     };

        //     switch (that.props.filterView.view) {
        //         case "all":
        //             // filterView[0].removeEventListener("mouseout", that.blueSlider(slider[0]));
        //             filterView[1].addEventListener("mouseout", () => { that.whiteSlider(slider[1]) });
        //             filterView[2].addEventListener("mouseout", () => { that.whiteSlider(slider[2]) });
        //             break;
        //         case "dog":
        //             filterView[0].addEventListener("mouseout", () => { that.whiteSlider(slider[0]) });
        //             // filterView[1].removeEventListener("mouseout", that.whiteSlider(slider[1]));
        //             filterView[2].addEventListener("mouseout", () => { that.whiteSlider(slider[2]) });
        //             break;
        //         case "bbq":
        //             filterView[0].addEventListener("mouseout", () => { that.whiteSlider(slider[0]) });
        //             filterView[1].addEventListener("mouseout", () => { that.whiteSlider(slider[1]) });
        //             // filterView[2].removeEventListener("mouseout", that.whiteSlider(slider[2]))
        //             break;
        //     };
        // })

        this.sliderRender = this.sliderRender || new Array(4);
        // if (this.props.filterView.view) return null;

        switch (this.props.filterView.view) {
            case "all":
                this.sliderRender[0] = <div key={0} className="slider" style={selectedStyle}></div>
                this.sliderRender[1] = <div key={1} className="slider" style={blankStyle}></div>
                this.sliderRender[2] = <div key={2} className="slider" style={blankStyle}></div>
                this.sliderRender[3] = <div key={3} className="slider" style={blankStyle}></div>
                break;
            case "dog":
                this.sliderRender[0] = <div key={0} className="slider" style={blankStyle}></div>
                this.sliderRender[1] = <div key={1} className="slider" style={selectedStyle}></div>
                this.sliderRender[2] = <div key={2} className="slider" style={blankStyle}></div>
                this.sliderRender[3] = <div key={3} className="slider" style={blankStyle}></div>
                break;
            case "bbq":
                this.sliderRender[0] = <div key={0} className="slider" style={blankStyle}></div>
                this.sliderRender[1] = <div key={1} className="slider" style={blankStyle}></div>
                this.sliderRender[2] = <div key={2} className="slider" style={selectedStyle}></div>
                this.sliderRender[3] = <div key={3} className="slider" style={blankStyle}></div>
                break;
            case "recentlyviewed":
                this.sliderRender[0] = <div key={0} className="slider" style={blankStyle}></div>
                this.sliderRender[1] = <div key={1} className="slider" style={blankStyle}></div>
                this.sliderRender[2] = <div key={2} className="slider" style={blankStyle}></div>
                this.sliderRender[3] = <div key={3} className="slider" style={selectedStyle}></div>
                break;  
        };
        
        return (
            <div className='MultiView'>
                <div>
                    <div className="FilterView" onClick={() => this.handleClick(event, "all")}>
                        <img className="img-icon" src="./star.png" alt=""/>
                        Popular
                    </div>

                    <div className="FilterView" onClick={() => {this.handleClick(event,"dog")}}>
                        <img className="img-icon" src="./dog.png" alt=""/>
                        Dogs
                    </div>

                    <div className="FilterView" onClick={() => { this.handleClick(event, "bbq") }}>
                        <img className="img-icon" src="./bbq.png" alt=""/>
                        Barbecue
                    </div>

                    <div className="FilterView" onClick={() => {this.handleClick(event, "recentlyviewed")}}>
                        <img className="img-icon" src="./recentlyviewed.png" alt=""/>
                        Recently Viewed
                    </div>
                </div>

                <div>
                    {this.sliderRender}
                </div>

            </div>
        )
    }
}

export default FilterView;