import React from 'react'
import * as Slider from '@radix-ui/react-slider'
import s from './Slider.module.css'

const SliderDemo = (props) => {
    return (
        <Slider.Root
            className={s.SliderRoot}
            step={1}
            min={0}
            max={100}
            value={[props.value]}
            onValueChange={props.onChange}
        >
            <Slider.Track className={s.SliderTrack}>
                <Slider.Range className={s.SliderRange} />
            </Slider.Track>
            <Slider.Thumb className={s.SliderThumb} aria-label="Volume" />
        </Slider.Root>
    )
}

export default SliderDemo
