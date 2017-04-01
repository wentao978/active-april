import React from 'react'
import classnames from 'classnames';
import Image from './Image'
import Text from './Text'
import Span from './Span'

import Base from '../style/base.scss'
import Style from '../style/style.scss'

class Content extends React.Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <div className="content">
                <Image src={require("../images/base.jpg")} className={Base.img} />
                <Image src={require("../images/top.png")} className={classnames(Base.img,Base.pa,Base.l0,Base.t0)} />
                <Text className={classnames(Style.timeDiv,Base.pa,Base.tc)}>剩余次数:<Span>{this.props.num}</Span></Text>
            </div>
        )
    }
}

export default Content