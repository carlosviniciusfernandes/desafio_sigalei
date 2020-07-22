// source: https://material-ui.com/components/pickers/#date-time-pickers

import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

interface DateProps {
  defaultDate: string,
  updateParent:any
}

export default function MaterialUIPickers({defaultDate, updateParent}:DateProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(defaultDate)
  );

  const handleDateChange = (date: Date | null) => {
    updateParent(date)
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Selecione uma data inicial"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}