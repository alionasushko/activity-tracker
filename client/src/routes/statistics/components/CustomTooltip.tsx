import { format } from 'date-fns'

const style = {
  padding: 6,
  backgroundColor: '#fff',
  border: '1px solid #ccc',
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any }) => {
  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null
    return (
      <div className="area-chart-tooltip" style={style}>
        <p>{currData ? format(new Date(currData.date), 'yyyy-MM-dd') : ' -- '}</p>
        <p>
          {'completed : '}
          <em>{currData ? currData.completed : ' -- '}</em>
        </p>
        <p>
          {'incompleted : '}
          <em>{currData ? currData.incompleted : ' -- '}</em>
        </p>
      </div>
    )
  }

  return null
}

export default CustomTooltip
