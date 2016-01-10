function getJsonOfXML(xmlString, tagnameFilter) {

  var
    parser = sax.parser(false, {
      lowercasetags: true,
      trim: true
    }),
    items = [],
    item = null,
    currentTag = null;


  parser.onclosetag = function (tagName) {
    if (tagName === tagnameFilter) {
      items.push(item);
      currentTag = item = null;
      return;
    }
    if (currentTag && currentTag.parent) {
      var p = currentTag.parent;
      delete currentTag.parent;
      currentTag = p;
    }
  };

  parser.onopentag = function (tag) {
    if (tag.name !== tagnameFilter && !item) return;
    if (tag.name === tagnameFilter) {
      item = tag;
    }
    tag.parent = currentTag;
    tag.children = [];
    tag.parent && tag.parent.children.push(tag);
    currentTag = tag;
  };

  parser.ontext = function (text) {
    if (currentTag) currentTag.children.push(text);
  };
  parser.onend = function () {
    // parser stream is done, and ready to have more stuff written to it.
    console.log('XML has been parsed.\n');
  };

  parser.write(xmlString).close();

  return items;

}


function sampleCleanUp(samples) {


  var newSamples = samples.reduce(

    // add for each sample a new object (finalSample)
    function (seed, item) {

      // predefine the empty object
      var finalSample = {
        name: '',
        samples: []
      };

      // now step throu all objects
      item.children.forEach(function (element, index, array) {

        // get the measured vallues
        if (element.name == 'sampleattribute') {

          element.children[0].children.forEach(function (_element, _index, _array) {

            if (_element.name == 'value') {
              finalSample.samples.push({
                nm: _element.attributes.name,
                value: _element.children[0]
              });
            }
          });
        }

        // set the name of the sample
        if (element.name == 'name') {
          finalSample.name = element.children[0];
        }
      });

      seed.push(finalSample);
      return seed;
    }, []
  );

  return newSamples;

  // console.log (newSamples);
}



function readCxfFromURL(url) {

  var cxfPatches;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {

    if (xmlhttp.readyState == 4) {
      switch (xmlhttp.status) {
      case 200: // all good
        var XML_string = xmlhttp.responseText;


        console.log('\nInput XML...\n\n');

        parsedObj = getJsonOfXML(XML_string, 'sample');
        cxfPatches = sampleCleanUp(parsedObj);
        //console.log(parsedObj);
        console.log('\nXML TO JSON...\n\n');
        //console.log(JSON.stringify(parsedObj));

        break;
      case 404: // Error: 404 - Resource not found!
        break;
      default: // Error: Unknown!
      }
    }
  };
  // xmlhttp.open('GET', url, true);
  xmlhttp.open('GET', url, false); // synchronous
  xmlhttp.send();
  return cxfPatches;
}
