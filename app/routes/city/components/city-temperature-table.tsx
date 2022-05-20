export default function CityTemperatureTable(props) {
    return (
        <table>
          <thead>
              <tr>
                  <td>Måned</td>
                  <td>Temperatur</td>
              </tr>
          </thead>
          <tbody>
              {
                  props.data.map(month => (
                      <tr>
                          <td>{month.referenceTime.substring(0,7)}</td>
                          <td>{month.observations[0].value}</td>
                      </tr>
                  ))
              }
          </tbody>
      </table>
    );
}